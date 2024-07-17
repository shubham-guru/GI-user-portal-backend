function createResponse(statusCode, message, data = {}) {
    return {
        statusCode,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type,Authorization,x-api-key,auth-token',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,PUT,DELETE'
        },
        body: JSON.stringify({ message, ...data })
    };
}

module.exports = { createResponse };
