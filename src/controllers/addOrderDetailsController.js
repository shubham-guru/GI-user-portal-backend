const { authenticateToken } = require('../middleware/authMiddleware');
const { addOrderDetails } = require('../services/userService');
const { createResponse } = require('../utils/response');

async function addOrderDetailsController(event) {
    const authResult = await authenticateToken(event);
    const authData = JSON.parse(authResult.body);

    if (authResult.statusCode === 200) {
        try {
            const { fullName, phone, completeAddress, pinCode, city, state, country, productName, quantity, unitValue, weight, height, breadth, length, weightUnit, sidesUnit, isWarehouse, pickUpAddressId, orderType, totalFare, isPaid } = JSON.parse(event.body);
    
            // if (!fullName || !phone || !completeAddress || !pinCode || !city || !state || !country || !productName || !quantity || !unitValue || !weight || !height || !breadth || !length || !weightUnit || !sidesUnit || !isWarehouse || !pickUpAddressId || !orderType || !totalFare || !isPaid) {
            //     throw new Error('Missing required fields');
            // }
            
            await addOrderDetails(event, userId);
    
            return createResponse(200, 'Order Details Added Successfully');
        } catch (error) {
            return createResponse(500, 'Order Details Not Added', { error: error.message });
        }
    } else {
        console.log("Unauthorized response from auth middleware:", authResult.body);
        return authResult;
    }
}


module.exports = { addOrderDetailsController };
