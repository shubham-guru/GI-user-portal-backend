const { authenticateToken } = require('../middleware/authMiddleware');
const { addAddress } = require('../services/userService');
const { createResponse } = require('../utils/response');

async function addressController(event) {
    const authResult = await authenticateToken(event);
    const authData = JSON.parse(authResult.body);
    const userId = authData.userId;

    if (authResult.statusCode === 200) {
        try {
            const { companyName, completeAddress, pinCode, city, state, country, isDefault } = JSON.parse(event.body);
    
            if (!companyName || !completeAddress || !pinCode || !city || !state || !country) {
                throw new Error('Missing required fields');
            }
            await addAddress(companyName, completeAddress, pinCode, city, state, country, isDefault, userId);
    
            return createResponse(200, 'Address Saved Successfully');
        } catch (error) {
            return createResponse(500, 'Address not saved', { error: error.message });
        }
    } else {
        console.log("Unauthorized response from auth middleware:", authResult.body);
        return authResult;
    }
}


module.exports = { addressController };
