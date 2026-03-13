const {pool} = require('./mysql');
const { getProductsById } = require('./productService');

async function createOrder(userId, productIds){

    console.log("USER ID:", userId);
    // uzimamo email korisnika iz baze
    const [users] = await pool.query(
        "SELECT email FROM users WHERE id = ?", [userId]
    );

    const email = users[0].email;

    // kreiramo order
    const [orderResult] = await pool.query(
        "INSERT INTO orders (user_id, user_email) VALUES (?, ?)",
        [userId, email]
    );

    const orderId = orderResult.insertId;

    // uzimamo proizvode
    const products = await getProductsById(productIds);

    for(const product of products){

        await pool.query(
            "INSERT INTO order_items (order_id, product_id, product_name) VALUES (?, ?, ?)",
            [orderId, product.id, product.name]
        );

    }

    return orderId;
}

module.exports = { createOrder };