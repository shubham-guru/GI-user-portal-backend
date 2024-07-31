const { authenticateToken } = require('../middleware/authMiddleware');
const { getSelectedAddresses } = require('../services/userService');
const { createResponse } = require('../utils/response');

async function getSelectedAddressController(event) {
    const authResult = await authenticateToken(event);

    if (authResult.statusCode === 200) {
        const { addressId } = JSON.parse(event.body);

        try {
            const address = await getSelectedAddresses(addressId);

            if (address) {
                return createResponse(200, 'Address Fetched Successfully', { address });
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

module.exports = { getSelectedAddressController };