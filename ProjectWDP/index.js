require('dotenv').config();
const express = require("express")
const app = express()

app.use(express.json())
app.use(express.static("public"))

const userRoutes = require("./server/routes/user")
app.use("/user", userRoutes)

const wishlistRoutes = require("./server/routes/wishlist")
app.use("/wishlist", wishlistRoutes)

const PORT = process.env.PORT || 3500

app.listen(PORT, () => console.log(`Server started on port ${PORT}!`))
