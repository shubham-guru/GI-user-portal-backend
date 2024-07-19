const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_KEY;

async function authenticateToken(event) {
    try {
        const authHeader = event.headers.Authorization || event.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            console.log("No token or incorrect token format");
            return {
                statusCode: 401,
                body: JSON.stringify({ error: 'No token provided or token is not in Bearer format' })
            };
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, secretKey);
        console.log("Token successfully verified", decoded);
        
        return {
            statusCode: 200,
            body: JSON.stringify(decoded)
        };

    } catch (error) {
        return {
            statusCode: 401,
            body: JSON.stringify({ error: 'Unauthorized', details: error.message })
        };
    }
}


module.exports = { authenticateToken };
