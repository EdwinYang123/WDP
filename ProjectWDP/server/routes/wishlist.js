const express = require("express")
const router = express.Router()
const Wishlist = require("../models/wishlist")

router.get('/getAllWishlists', async (req, res) => {
    try {
        const wishlists = await Wishlist.getAllWishlists()
        res.send(wishlists)
    } catch(err) {
        res.status(401).send({message: err.message})
    }
})

module.exports = router
