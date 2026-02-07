const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    // Common Fields
    role: {
        type: String,
        enum: ['admin', 'student', 'lecturer', 'staff'],
        required: true,
    },
    // Student Specific Fields
    studentId: { type: String, unique: true, sparse: true }, // Index Number
    programme: { type: String },
    faculty: { type: String },
    department: { type: String }, // Explicitly adding department for consistency
    level: { type: String, enum: ['100', '200', '300', '400'] },
    admissionDate: { type: Date },
    studentStatus: {
        type: String,
        enum: ['Active', 'Deferred', 'Withdrawn', 'Graduated'],
        default: 'Active'
    },

    // Lecturer/Staff Specific Fields
    staffId: { type: String, unique: true, sparse: true },
    department: { type: String },
    rank: { type: String }, // e.g. Senior Lecturer, Professor
    staffStatus: {
        type: String,
        enum: ['Active', 'On Leave', 'Retired', 'Suspended'],
        default: 'Active'
    },

    isDefaultPassword: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Method to compare passwords
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
