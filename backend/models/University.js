const mongoose = require('mongoose');

const universitySchema = new mongoose.Schema({
    name: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    address: { type: String },
    contactEmail: { type: String, required: true },
    contactPhone: { type: String },
    logo: { type: String },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' }
}, { timestamps: true });

module.exports = mongoose.model('University', universitySchema);
