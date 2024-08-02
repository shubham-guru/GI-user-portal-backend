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
        const [rows] = await conn.query(query, values);

        return rows;
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

// Get Selected Addresses
async function getSelectedAddresses(addressId) {
    const connection = await getConnection();
    const conn = await connection.getConnection();
    try {
        const query = 'SELECT * FROM user_addresses WHERE USER_ADDRESS_ID = ?';
        const values = [addressId];
        const [rows] = await conn.query(query, values);

        return rows;
    } catch (error) {
        console.error('Error calling stored procedure:', error);
        throw error;
    } finally {
        await conn.release();
    }
}


// Add Order Details
async function addOrderDetails(event, userId) {
    const connection = await getConnection();
    const conn = await connection.getConnection();
    const { fullName, email, phone, alternatePhone, completeAddress, pinCode, city, state, country, products, weight, height, breadth, length, weightUnit, sidesUnit, isWarehouse, pickUpAddressId, orderType, totalFare, isPaid, paymentId } = JSON.parse(event.body);

    try {
        // Ensure userId is not null or undefined
        if (!userId) {
            throw new Error('User ID is required');
        }

         // Create JSON string for product details
         const productDetails = JSON.stringify(products.map(product => ({
            productName: product.productName,
            quantity: product.quantity,
            unitValue: product.unitValue,
            hsnCode: product.hsnCode,
            skuWeight: product.skuWeight,
            skuColor: product.skuColor,
            skuSize: product.skuSize,
        })));

        const query = 'CALL AddOrderDetails(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        const values = [fullName, email, phone, alternatePhone, completeAddress, pinCode, city, state, country, productDetails, weight, length, breadth, height, weightUnit, sidesUnit, isWarehouse, pickUpAddressId, orderType, totalFare, isPaid, paymentId, userId];

        // Execute the stored procedure
        await conn.query(query, values);

        return {
            message: 'Order Details Added Successfully',
        };
    } catch (error) {
        console.error('Error calling stored procedure:', error);
        throw error;
    } finally {
        await conn.release();
    }
}

async function getOrders(userId) {
    const connection = await getConnection();
    const conn = await connection.getConnection();
    try {
        const query = 'SELECT * from gi_orders where USER_ID = ?';
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
    getAddresses,
    addOrderDetails,
    getSelectedAddresses,
    getOrders
};
