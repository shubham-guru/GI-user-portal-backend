const { authenticateToken } = require('../middleware/authMiddleware');
const { getOrders } = require('../services/userService');
const { createResponse } = require('../utils/response');

async function getOrdersControllers(event) {
    const authResult = await authenticateToken(event);
    const authData = JSON.parse(authResult.body);
    const userId = authData.userId;

    if (authResult.statusCode === 200) {
        try {

            const data = await getOrders(userId);

            return createResponse(200, 'Orders fetched Successfully', { data });
        } catch (error) {
            return createResponse(500, 'Failed to fetch Orders', { error: error.message });
        }
    } else {
        console.log("Unauthorized response from auth middleware:", authResult.body);
        return authResult;
    }
}

module.exports = { getOrdersControllers };
