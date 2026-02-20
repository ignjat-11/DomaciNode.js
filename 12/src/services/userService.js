const {pool} = require('./mysql');

async function createUser(name, email, password){

    const [result] = await pool.query("INSERT INTO users(name, email, password) VALUES (?, ?, ?)" , [
        name , email, password
    ]);
    return result.insertId;
}

async function getAllUsers() {
  const [rows] = await pool.query("SELECT * FROM users");
  return rows;
}

async function userExists(email) {
    const [rows] = await pool.query("Select id from users where email = ? limit 1", [email]);
    return rows.length > 0;
}
async function getUserByEmail(email) {
    const [rows] = await pool.query("SELECT * FROM users where email = ? LIMIT 1", [email]);
    return rows[0] || null;
}
module.exports = { createUser,getAllUsers, userExists,getUserByEmail };