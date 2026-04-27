const { query } = require("./db_connect")

async function createUserTable() {
    let sql = `
        CREATE TABLE IF NOT EXISTS User (
            userId INT AUTO_INCREMENT,
            firstName VARCHAR(50) NOT NULL,
            lastName VARCHAR(50) NOT NULL,
            username VARCHAR(50) NOT NULL UNIQUE,
            password VARCHAR(50) NOT NULL,
            CONSTRAINT userPK PRIMARY KEY(userId)
        ); `

    await query(sql)
}

createUserTable()

async function getAllUsers() {
    let sql = `
      SELECT * FROM User;
    `
    return await query(sql)
}

module.exports = { getAllUsers }
