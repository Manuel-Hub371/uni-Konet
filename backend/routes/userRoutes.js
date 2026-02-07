const express = require('express');
const router = express.Router();
const { authUser, changePassword } = require('../controllers/authController');
const { registerUser, getUsers } = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware');

router.post('/login', authUser);
router.put('/change-password', protect, changePassword);
router.route('/').post(protect, admin, registerUser).get(protect, admin, getUsers);

module.exports = router;
