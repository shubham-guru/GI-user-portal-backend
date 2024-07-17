const { generateUniqueUserId } = require('../helpers/generateUniqueUserId');
const { getConnection } = require('../utils/db');

// Login Service
async function loginUser(email, password) {
    const connection = await getConnection();
    const conn = await connection.getConnection();

    const query = 'SELECT * FROM gi_users WHERE EMAIL_ID = ? AND PASSWORD = ?';
    const values = [email, password];

    // Execute the query
    const [rows] = await conn.query(query, values);

    await conn.release();

    if (rows.length > 0) {
        return rows[0];
    }
    return null;
}

// Create user Service
async function createUser(fullName, email, password, phone) {
    const connection = await getConnection();
    const conn = await connection.getConnection();

    const user_id = await generateUniqueUserId(conn);
    const currentTimestamp = new Date().toISOString();

    const query = 'INSERT INTO gi_users (USER_ID, FULLNAME, EMAIL_ID, PASSWORD, PHONE, CREATED_AT) VALUES (?, ?, ?, ?, ?, ?)';
    const values = [user_id, fullName, email, password, phone, currentTimestamp];

    await conn.query(query, values);
    await conn.release(); // Release the connection back to the pool
}

async function addAddress(companyName, completeAddress, pinCode, city, state, country, isDefault, userId) {
    const connection = await getConnection();
    const conn = await connection.getConnection();
    try {
        const query = 'CALL AddUserAddress(?, ?, ?, ?, ?, ?, ?, ?)';
        const values = [companyName, completeAddress, pinCode, city, state, country, isDefault, userId];

        await conn.query(query, values);
    } catch (error) {
        console.error('Error calling stored procedure:', error);
        throw error;
    } finally {
        await conn.release(); // Release the connection back to the pool
    }
}


async function updateUserAgreement(userId) {
    const connection = await getConnection();
    const conn = await connection.getConnection();
    try {
        const query = 'UPDATE gi_users SET IS_AGREEMENT = true WHERE USER_ID = ?';
        const values = [userId];
        await conn.query(query, values);
    } catch (error) {
        console.error('Error calling stored procedure:', error);
        throw error;
    } finally {
        await conn.release(); // Release the connection back to the pool
    }
}


module.exports = {
    loginUser,
    createUser,
    addAddress,
    updateUserAgreement
};
