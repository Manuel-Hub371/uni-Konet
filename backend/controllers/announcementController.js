const Announcement = require('../models/Announcement');

// @desc    Get all announcements (filtered by audience optional)
// @route   GET /api/announcements
// @access  Private
const getAnnouncements = async (req, res) => {
    // If student, get 'All' + 'Student'
    // If lecturer, get 'All' + 'Lecturer' + 'Staff'
    // For now, just return all active ones for simplicity, or filter if role provided
    const announcements = await Announcement.find({ isActive: true }).sort({ createdAt: -1 }).populate('author', 'name');
    res.json(announcements);
};

// @desc    Create an announcement
// @route   POST /api/announcements
// @access  Private/Admin
const createAnnouncement = async (req, res) => {
    const { title, message, category, targetAudience } = req.body;

    const announcement = await Announcement.create({
        title,
        message,
        category,
        targetAudience,
        author: req.user._id,
    });

    if (announcement) {
        res.status(201).json(announcement);
    } else {
        res.status(400).json({ message: 'Invalid announcement data' });
    }
};

// @desc    Delete an announcement
// @route   DELETE /api/announcements/:id
// @access  Private/Admin
const deleteAnnouncement = async (req, res) => {
    const announcement = await Announcement.findById(req.params.id);

    if (announcement) {
        await announcement.deleteOne();
        res.json({ message: 'Announcement removed' });
    } else {
        res.status(404).json({ message: 'Announcement not found' });
    }
};

module.exports = { getAnnouncements, createAnnouncement, deleteAnnouncement };
