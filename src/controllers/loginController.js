const { loginUser } = require('../services/userService');
const { createResponse } = require('../utils/response');

async function loginController(event) {
    try {
        const { email, password } = JSON.parse(event.body);

        if (!email || !password) {
            throw new Error('Missing required fields');
        }

        const user = await loginUser(email, password);

        if (user) {
            return createResponse(200, 'Login successful', { user });
        } else {
            return createResponse(401, 'Invalid email or password');
        }
    } catch (error) {
        return createResponse(500, 'Failed to login', { error: error.message });
    }
}

module.exports = { loginController };
