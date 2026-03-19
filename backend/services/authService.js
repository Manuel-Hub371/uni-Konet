const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const userRepository = require('../repositories/userRepository');

class AuthService {
    async login(email, password) {
        const user = await userRepository.findByEmail(email);
        if (user && (await bcrypt.compare(password, user.password))) {
            return {
                _id: user.id, // Prisma uses 'id', not '_id'
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role,
                universityId: user.universityId,
                token: this.generateToken(user.id)
            };
        }
        throw new Error('Invalid email or password');
    }

    generateToken(id) {
        return jwt.sign({ id }, process.env.JWT_SECRET, {
            expiresIn: '30d'
        });
    }

    async register(userData) {
        const userExists = await userRepository.findByEmail(userData.email);
        if (userExists) {
            throw new Error('User already exists');
        }
        
        // Hash password before creating
        const salt = await bcrypt.genSalt(10);
        userData.password = await bcrypt.hash(userData.password, salt);
        
        return await userRepository.create(userData);
    }
}

module.exports = new AuthService();
