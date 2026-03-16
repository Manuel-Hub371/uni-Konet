const jwt = require('jsonwebtoken');
const userRepository = require('../repositories/userRepository');

class AuthService {
    async login(email, password) {
        const user = await userRepository.findByEmail(email);
        if (user && (await user.comparePassword(password))) {
            return {
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role,
                universityId: user.universityId,
                token: this.generateToken(user._id)
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
        return await userRepository.create(userData);
    }
}

module.exports = new AuthService();
