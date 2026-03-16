const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
    paymentMethod: { type: String },
    reference: { type: String, required: true },
    universityId: { type: mongoose.Schema.Types.ObjectId, ref: 'University', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);
