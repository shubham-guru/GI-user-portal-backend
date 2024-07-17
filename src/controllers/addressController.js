const { addAddress } = require('../services/userService');
const { createResponse } = require('../utils/response');

async function addressController(event) {
    try {
        const { companyName, completeAddress, pinCode, city, state, country, isDefault, userId } = JSON.parse(event.body);

        if (!companyName || !completeAddress || !pinCode || !city || !state || !country || userId === undefined) {
            throw new Error('Missing required fields');
        }

        await addAddress(companyName, completeAddress, pinCode, city, state, country, isDefault, userId);

        return createResponse(200, 'Address Saved Successfully');
    } catch (error) {
        return createResponse(500, 'Address not saved', { error: error.message });
    }
}

module.exports = { addressController };
