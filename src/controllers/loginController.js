const { loginUser } = require('../services/userService');
const { createResponse } = require('../utils/response');
const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_KEY;

async function loginController(event) {
    try {
        const { email, password } = JSON.parse(event.body);

        if (!email || !password) {
            throw new Error('Missing required fields');
        }

        const user = await loginUser(email, password);

        const token = jwt.sign({ email: email, userId: user.USER_ID }, secretKey, { expiresIn: '24h' });
        const { USER_ID, EMAIL_ID, ...rest } = user;
        const result = { rest, token }

        if (user) {
            return createResponse(200, 'Login successful', { result });
        } else {
            return createResponse(401, 'Invalid email or password');
        }
    } catch (error) {
        return createResponse(500, 'Failed to login', { error: error.message });
    }
}

module.exports = { loginController };
