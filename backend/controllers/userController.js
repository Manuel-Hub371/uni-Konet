const User = require('../models/User');

// @desc    Register a new user (Student or Lecturer)
// @route   POST /api/users
// @access  Private/Admin
const registerUser = async (req, res) => {
    const { name, email, role, programme, department } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400).json({ message: 'User already exists' });
        return;
    }

    // Default password logic
    const password = 'P@ass4ktu'; // Or generate random

    const user = await User.create({
        name,
        email,
        password,
        role,
        programme: role === 'student' ? programme : undefined,
        department: role === 'lecturer' ? department : undefined,
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            message: `${role} registered successfully`,
        });
    } else {
        res.status(400).json({ message: 'Invalid user data' });
    }
};

// @desc    Get users by role
// @route   GET /api/users?role=student
// @access  Private/Admin
const getUsers = async (req, res) => {
    const role = req.query.role;
    let query = {};
    if (role) {
        query.role = role;
    }

    const users = await User.find(query).select('-password');
    res.json(users);
};

module.exports = { registerUser, getUsers };
