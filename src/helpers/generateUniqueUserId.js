function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

async function generateUniqueUserId(connection) {
    let isUnique = false;
    let newId = '';

    while (!isUnique) {
        newId = `GI-${generateRandomString(5)}`;
        const [rows] = await connection.query('SELECT COUNT(*) AS count FROM gi_users WHERE USER_ID = ?', [newId]);
        if (rows[0].count === 0) {
            isUnique = true;
        }
    }
    return newId;
}

module.exports = { generateUniqueUserId };