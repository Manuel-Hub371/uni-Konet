const mongoose = require('mongoose');

const lecturerSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    employeeId: { type: String, required: true, unique: true },
    departmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
    designation: { type: String },
    universityId: { type: mongoose.Schema.Types.ObjectId, ref: 'University', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Lecturer', lecturerSchema);
