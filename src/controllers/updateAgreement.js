const { updateUserAgreement } = require('../services/userService');
const { createResponse } = require('../utils/response');

async function updateAgreement(event) {
    try {
        const userId = event.queryStringParameters.userId;

        if (!userId) {
            throw new Error('Missing required fields');
        }

        await updateUserAgreement(userId);

        return createResponse(200, 'Agreement Signed by user');
    } catch (error) {
        return createResponse(500, 'Failed to update agreement', { error: error.message });
    }
}

module.exports = { updateAgreement };
