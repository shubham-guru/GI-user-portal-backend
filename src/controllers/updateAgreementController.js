const { authenticateToken } = require('../middleware/authMiddleware');
const { updateUserAgreement } = require('../services/userService');
const { createResponse } = require('../utils/response');

async function updateAgreementController(event) {
    const authResult = await authenticateToken(event);
    const authData = JSON.parse(authResult.body);
    const userId = authData.userId;

    if (authResult.statusCode === 200) {
        try {

            await updateUserAgreement(userId);

            return createResponse(200, 'Agreement Signed by user');
        } catch (error) {
            return createResponse(500, 'Failed to update agreement', { error: error.message });
        }
    } else {
        console.log("Unauthorized response from auth middleware:", authResult.body);
        return authResult;
    }
}

module.exports = { updateAgreementController };
