const { createUser } = require('../services/userService');
const { createResponse } = require('../utils/response');

async function signupController(event) {
    try {
        const { fullName, email, password, phone, registeredFrom, image } = JSON.parse(event.body);

        if (!fullName || !email || !registeredFrom || !password) {
            throw new Error('Missing required fields');
        }

        await createUser(fullName, email, password, phone, registeredFrom, image);

        return createResponse(200, 'User Successfully Registered');
    } catch (error) {
        return createResponse(500, 'Failed to insert data', { error: error.message });
    }
}

module.exports = { signupController };
