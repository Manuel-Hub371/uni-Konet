const authService = require('../services/authService');

class AuthController {
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const result = await authService.login(email, password);
            res.json(result);
        } catch (error) {
            res.status(401).json({ message: error.message });
        }
    }

    async register(req, res) {
        try {
            const user = await authService.register(req.body);
            res.status(201).json(user);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getMe(req, res) {
        res.json(req.user);
    }
}

module.exports = new AuthController();
