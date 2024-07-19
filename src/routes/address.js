const { addressController } = require("../controllers/addressController");
const { getAddressesController } = require("../controllers/getAddressesController");
const apiRoutes = require("../utils/apiRoutes");

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
    if(event.resource === apiRoutes.ADDRESS) {
        return await addressController(event);
    } else if(event.resource === apiRoutes.GET_ADDRESSES) {
        return await getAddressesController(event);
    }
};
