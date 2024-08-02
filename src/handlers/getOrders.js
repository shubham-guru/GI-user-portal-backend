const { getOrdersControllers } = require("../controllers/getOrdersController");

exports.handler = async (event) => {
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type,Authorization,x-api-key,auth-token',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
            },
            body: JSON.stringify({ message: 'CORS preflight check.' })
        };
    }
    return await getOrdersControllers(event);
};
