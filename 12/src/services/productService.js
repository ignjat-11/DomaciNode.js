const { pool } = require('./mysql');

async function getAllProducts(){

    const [rows] = await pool.query("SELECT * FROM products");
    return rows;
}

async function fetchSingleProduct(slug)
{
    const [rows] = await pool.query("Select * from products where slug = ? limit 1;", [slug]);
    return rows[0] || null;
}
module.exports = { getAllProducts, fetchSingleProduct };