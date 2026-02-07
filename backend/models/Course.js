const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true, // e.g., CS101
    },
    title: {
        type: String,
        required: true,
    },
    creditHours: {
        type: Number,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    level: {
        type: String,
        enum: ['100', '200', '300', '400'],
        required: true,
    },
    semester: {
        type: String,
        enum: ['1', '2'],
        required: true,
    },
    assignedLecturer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
}, { timestamps: true });

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
