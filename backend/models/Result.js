const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
    enrollmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Enrollment', required: true },
    grade: { type: String, required: true },
    marks: { type: Number, required: true },
    semester: { type: Number, required: true },
    universityId: { type: mongoose.Schema.Types.ObjectId, ref: 'University', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Result', resultSchema);
