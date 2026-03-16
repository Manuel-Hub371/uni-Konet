const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    studentId: { type: String, required: true, unique: true },
    departmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
    enrollmentDate: { type: Date, default: Date.now },
    currentSemester: { type: Number, default: 1 },
    universityId: { type: mongoose.Schema.Types.ObjectId, ref: 'University', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);
