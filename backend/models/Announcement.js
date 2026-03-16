const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    targetAudience: { 
        type: String, 
        enum: ['All', 'Lecturers', 'Students'], 
        default: 'All' 
    },
    universityId: { type: mongoose.Schema.Types.ObjectId, ref: 'University', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Announcement', announcementSchema);
