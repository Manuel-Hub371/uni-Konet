const Course = require('../models/Course');

// @desc    Get all courses
// @route   GET /api/courses
// @access  Private
const getCourses = async (req, res) => {
    const courses = await Course.find().populate('assignedLecturer', 'name');
    res.json(courses);
};

// @desc    Create a course
// @route   POST /api/courses
// @access  Private/Admin
const createCourse = async (req, res) => {
    const { code, title, creditHours, department, level, semester, assignedLecturer } = req.body;

    const courseExists = await Course.findOne({ code });

    if (courseExists) {
        res.status(400).json({ message: 'Course already exists' });
        return;
    }

    const course = await Course.create({
        code,
        title,
        creditHours,
        department,
        level,
        semester,
        assignedLecturer: assignedLecturer || undefined,
    });

    if (course) {
        res.status(201).json(course);
    } else {
        res.status(400).json({ message: 'Invalid course data' });
    }
};

// @desc    Delete a course
// @route   DELETE /api/courses/:id
// @access  Private/Admin
const deleteCourse = async (req, res) => {
    const course = await Course.findById(req.params.id);

    if (course) {
        await course.deleteOne();
        res.json({ message: 'Course removed' });
    } else {
        res.status(404).json({ message: 'Course not found' });
    }
};

module.exports = { getCourses, createCourse, deleteCourse };
