const { authenticateToken } = require('../middleware/authMiddleware');
const { getAddresses } = require('../services/userService');
const { createResponse } = require('../utils/response');

async function getAddressesController(event) {
    const authResult = await authenticateToken(event);

    if (authResult.statusCode === 200) {
        const authData = JSON.parse(authResult.body);
        const userId = authData.userId;

        try {
            const addresses = await getAddresses(userId);

            if (addresses) {
                return createResponse(200, 'Addresses Fetched Successfully', { addresses });
            } else {
                return createResponse(404, 'No addresses found');
            }
        } catch (error) {
            console.error('Error fetching addresses:', error);
            return createResponse(500, 'Failed to fetch addresses', { error: error.message });
        }
    } else {
        console.log("Unauthorized response from auth middleware:", authResult.body);
        return createResponse(401, 'Unauthorized', authResult.body);
    }
}

module.exports = { getAddressesController };