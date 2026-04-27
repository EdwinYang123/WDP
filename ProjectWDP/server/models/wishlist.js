const { query } = require("./db_connect")

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

    await query(sql)
}

createWishlistTable()

async function getAllWishlists() {
    let sql = `
      SELECT * FROM Wishlist;
    `
    return await query(sql)
}

module.exports = { getAllWishlists }
