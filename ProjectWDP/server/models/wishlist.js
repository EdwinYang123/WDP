const con = require("./db_connect")

async function createWishlistTable() {
    let sql = `
        CREATE TABLE IF NOT EXISTS Wishlist (
            wishlistId INT AUTO_INCREMENT,
            wishlistName VARCHAR(100) NOT NULL,
            wishlistDescription VARCHAR(255) NOT NULL,
            dateCreated DATE NOT NULL,
            userId INT NOT NULL,
            CONSTRAINT wishlistPK PRIMARY KEY(wishlistId),
            CONSTRAINT userFK FOREIGN KEY(userId) REFERENCES User(userId)
        ); `

    await con.query(sql)
}

createWishlistTable()

// READ — Get all wishlists
async function getAllWishlists() {
    let sql = `
        SELECT * FROM Wishlist;
    `
    return await con.query(sql)
}

// CREATE — Create a new wishlist
async function createWishlist(wishlist) {
    let sql = `
        INSERT INTO Wishlist(wishlistName, wishlistDescription, dateCreated, userId)
        VALUES(?, ?, ?, ?)
    `
    await con.query(sql, [wishlist.wishlistName, wishlist.wishlistDescription, wishlist.dateCreated, wishlist.userId])

    let newWishlist = await con.query(`SELECT * FROM Wishlist WHERE wishlistId=LAST_INSERT_ID()`)
    return newWishlist[0]
}

// UPDATE — Update a wishlist
async function updateWishlist(wishlist) {
    let sql = `
        UPDATE Wishlist
        SET wishlistName=?, wishlistDescription=?
        WHERE wishlistId=?
    `
    await con.query(sql, [wishlist.wishlistName, wishlist.wishlistDescription, wishlist.wishlistId])

    let updated = await con.query(`SELECT * FROM Wishlist WHERE wishlistId=?`, [wishlist.wishlistId])
    return updated[0]
}

// DELETE — Delete a wishlist
async function deleteWishlist(wishlistId) {
    let sql = `
        DELETE FROM Wishlist
        WHERE wishlistId=?
    `
    return await con.query(sql, [wishlistId])
}

module.exports = { getAllWishlists, createWishlist, updateWishlist, deleteWishlist }
