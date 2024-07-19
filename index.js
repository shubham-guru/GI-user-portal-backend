const login = require("./src/routes/login");
const signup = require("./src/routes/signup");
const address = require("./src/routes/address");
const apiRoutes = require('./src/utils/apiRoutes');

exports.handler = async (event) => {
    // Log the event for debugging
    console.log('Received event:', JSON.stringify(event, null, 2));

    // Safeguard against undefined properties
    if (!event.requestContext || !event.requestContext.resourcePath) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'Missing resourcePath in event requestContext' })
        };
    }

    const route = event.requestContext.resourcePath;

    if (route === apiRoutes.LOGIN) {
        return await login.handler(event);
    } else if (route === apiRoutes.SIGNUP) {
        return await signup.handler(event);
    } else if (route === apiRoutes.ADDRESS) {
        return await address.handler(event);
    } else if (route === apiRoutes.GET_ADDRESSES) {
        return await address.handler(event);
    }else {
        return {
            statusCode: 404,
            body: JSON.stringify({ message: 'Route not found' })
        };
    }
};
