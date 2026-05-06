const express = require("express")
const router = express.Router()
const Wishlist = require("../models/wishlist")

// GET — Get all wishlists
router.get('/getAllWishlists', async (req, res) => {
    try {
        const wishlists = await Wishlist.getAllWishlists()
        res.send(wishlists)
    } catch(err) {
        res.status(401).send({message: err.message})
    }
})

// POST — Create a new wishlist
router.post('/createWishlist', async (req, res) => {
    try {
        const wishlist = await Wishlist.createWishlist(req.body)
        res.send(wishlist)
    } catch(err) {
        res.status(401).send({message: err.message})
    }
})

// PUT — Update a wishlist
router.put('/updateWishlist', async (req, res) => {
    try {
        const wishlist = await Wishlist.updateWishlist(req.body)
        res.send(wishlist)
    } catch(err) {
        res.status(401).send({message: err.message})
    }
})

// DELETE — Delete a wishlist
router.delete('/deleteWishlist/:wishlistId', async (req, res) => {
    try {
        await Wishlist.deleteWishlist(req.params.wishlistId)
        res.send({message: "Wishlist deleted successfully"})
    } catch(err) {
        res.status(401).send({message: err.message})
    }
})

module.exports = router
