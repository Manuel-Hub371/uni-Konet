const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    code: { type: String, required: true },
    headOfDepartment: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    universityId: { type: mongoose.Schema.Types.ObjectId, ref: 'University', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Department', departmentSchema);
