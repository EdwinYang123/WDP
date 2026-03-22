CREATE TABLE IF NOT EXISTS User (
    userId INT AUTO_INCREMENT, --no PK constraint
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    CONSTRAINT userPK PRIMARY KEY(userId) -- PK constraint
);

CREATE TABLE IF NOT EXISTS Wishlist (
    wishlistId INT AUTO_INCREMENT PRIMARY KEY, --PK constraint
    wishlistName VARCHAR(100) NOT NULL,
    wishlistDescription VARCHAR(255) NOT NULL,
    itemAmount INT AUTO_INCREMENT NOT NULL,
    dateCreated DATE NOT NULL, 
    CONSTRAINT userFK FOREIGN KEY(userId) REFERENCES User(userId) --no Pk constraint userId reference
);

CREATE TABLE IF NOT EXISTS Item (
    itemId INT AUTO_INCREMENT PRIMARY KEY, --PK constraint
    itemName VARCHAR(100) NOT NULL,
    itemDescription VARCHAR(255) NOT NULL,
    itemLink VARCHAR(255),
    itemNumber INT AUTO_INCREMENT,
    dateAdded DATE NOT NULL, 
    CONSTRAINT userFK FOREIGN KEY(userId) REFERENCES User(userId) REFERENCES Wishlist(wishlistId)--no Pk constraint userId reference
);