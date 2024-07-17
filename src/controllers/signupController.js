const { createUser } = require('../services/userService');
const { createResponse } = require('../utils/response');

async function signupController(event) {
    try {
        const { fullName, email, password, phone } = JSON.parse(event.body);

        if (!fullName || !email || !password || !phone) {
            throw new Error('Missing required fields');
        }

        await createUser(fullName, email, password, phone);

        return createResponse(200, 'User Registered successfully');
    } catch (error) {
        return createResponse(500, 'Failed to insert data', { error: error.message });
    }
}

module.exports = { signupController };
