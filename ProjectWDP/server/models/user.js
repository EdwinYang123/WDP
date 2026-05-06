const con = require("./db_connect")
const bcrypt = require("bcrypt")

async function createUserTable() {
    let sql = `
        CREATE TABLE IF NOT EXISTS User (
            userId INT AUTO_INCREMENT,
            firstName VARCHAR(50) NOT NULL,
            lastName VARCHAR(50) NOT NULL,
            username VARCHAR(50) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            CONSTRAINT userPK PRIMARY KEY(userId)
        ); `

    await con.query(sql)
}

createUserTable()

// Helper — check if a user exists by username
async function userExists(user) {
    let sql = `
        SELECT * FROM User
        WHERE username=?
    `
    let cUser = await con.query(sql, [user.username])
    return cUser[0]
}

// READ — Get all users
async function getAllUsers() {
    let sql = `
        SELECT * FROM User;
    `
    return await con.query(sql)
}

// READ — Login
async function login(user) {
    let cUser = await userExists(user)
    if (!cUser) throw Error("Username not found!")

    let match = await bcrypt.compare(user.password, cUser.password)
    if (!match) throw Error("Password incorrect!")

    return cUser
}

// CREATE — Register
async function register(user) {
    let cUser = await userExists(user)
    if (cUser) throw Error("Username already in use!")

    let hashedPassword = await bcrypt.hash(user.password, 10)

    let sql = `
        INSERT INTO User(firstName, lastName, username, password)
        VALUES(?, ?, ?, ?)
    `
    await con.query(sql, [user.firstName, user.lastName, user.username, hashedPassword])
    return await userExists(user)
}

// UPDATE — Update user info
async function updateUser(user) {
    let sql = `
        UPDATE User
        SET firstName=?, lastName=?, username=?
        WHERE userId=?
    `
    await con.query(sql, [user.firstName, user.lastName, user.username, user.userId])

    let updated = await con.query(`SELECT * FROM User WHERE userId=?`, [user.userId])
    return updated[0]
}

// DELETE — Delete a user
async function deleteUser(userId) {
    let sql = `
        DELETE FROM User
        WHERE userId=?
    `
    return await con.query(sql, [userId])
}

module.exports = { getAllUsers, login, register, updateUser, deleteUser }
