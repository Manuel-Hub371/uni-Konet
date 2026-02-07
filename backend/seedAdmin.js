const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB Connected');

        const adminExists = await User.findOne({ email: 'admin@ktu.edu.gh' });

        if (adminExists) {
            console.log('Admin user already exists');
            console.log('Email: admin@ktu.edu.gh');
            // We can't show the password if it's hashed, but we can reset it if needed.
            // For now, let's assume it's the default if it exists, or just tell the user.
        } else {
            const admin = await User.create({
                name: 'System Admin',
                email: 'admin@ktu.edu.gh',
                password: 'P@ass4ktuadmin', // This will be hashed by the pre-save hook in User model
                role: 'admin',
            });
            console.log('Admin user created successfully');
            console.log('Email: admin@ktu.edu.gh');
            console.log('Password: P@ass4ktuadmin');
        }

        process.exit();
    } catch (error) {
        console.error('Error seeding admin:', error);
        process.exit(1);
    }
};

seedAdmin();
