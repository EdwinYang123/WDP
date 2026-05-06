const express = require("express")
const router = express.Router()
const User = require("../models/user")

// GET — Get all users
router.get('/getAllUsers', async (req, res) => {
    try {
        const users = await User.getAllUsers()
        res.send(users)
    } catch(err) {
        res.status(401).send({message: err.message})
    }
})

// POST — Login
router.post('/login', async (req, res) => {
    try {
        const user = await User.login(req.body)
        res.send({...user, password: undefined})
    } catch(err) {
        res.status(401).send({message: err.message})
    }
})

// POST — Register
router.post('/register', async (req, res) => {
    try {
        const user = await User.register(req.body)
        res.send({...user, password: undefined})
    } catch(err) {
        res.status(401).send({message: err.message})
    }
})

// PUT — Update user
router.put('/updateUser', async (req, res) => {
    try {
        const user = await User.updateUser(req.body)
        res.send({...user, password: undefined})
    } catch(err) {
        res.status(401).send({message: err.message})
    }
})

// DELETE — Delete user
router.delete('/deleteUser/:userId', async (req, res) => {
    try {
        await User.deleteUser(req.params.userId)
        res.send({message: "User deleted successfully"})
    } catch(err) {
        res.status(401).send({message: err.message})
    }
})

module.exports = router
