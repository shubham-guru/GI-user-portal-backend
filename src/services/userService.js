const { generateUniqueUserId } = require('../helpers/generateUniqueUserId');
const { getConnection } = require('../utils/db');

// Login Service
async function loginUser(email, password) {
    const connection = await getConnection();
    const conn = await connection.getConnection();

    const query = 'SELECT * FROM gi_users WHERE EMAIL_ID = ? AND PASSWORD = ?';
    const values = [email, password];

    const [rows] = await conn.query(query, values);
    await conn.release();

    if (rows.length > 0) {
        return rows[0];
    }
    return null;
}

// Create user Service
async function createUser(fullName, email, password, phone, registredFrom, image) {
    const connection = await getConnection();
    const conn = await connection.getConnection();

    const user_id = await generateUniqueUserId(conn);
    const currentTimestamp = new Date().toISOString();

    const query = 'INSERT INTO gi_users (USER_ID, FULLNAME, EMAIL_ID, PASSWORD, PHONE, REGISTERED_FROM, USER_IMAGE, CREATED_AT) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    const values = [user_id, fullName, email, password, phone, registredFrom, image, currentTimestamp];

    await conn.query(query, values);
    await conn.release();
}

// Add Address Service
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
        await conn.release();
    }
}

// Update User Agreement Service
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
        await conn.release();
    }
}

// Get Addresses
async function getAddresses(userId) {
    const connection = await getConnection();
    const conn = await connection.getConnection();
    try {
        const query = 'SELECT * FROM user_addresses WHERE USER_ID = ?';
        const values = [userId];
        const [rows] = await conn.query(query, values);
        
        return rows; 
    } catch (error) {
        console.error('Error calling stored procedure:', error);
        throw error;
    } finally {
        await conn.release();
    }
}


module.exports = {
    loginUser,
    createUser,
    addAddress,
    updateUserAgreement,
    getAddresses
};
