const {pool} = require('./mysql');

async function createUser(name, email, password){

    await pool.query("INSERT INTO users(name, email, password) VALUES (?, ?, ?)" , [
        name , email, password
    ]);
}

async function getAllUsers() {
  const [rows] = await pool.query("SELECT * FROM users");
  return rows;
}

module.exports = { createUser,getAllUsers };