const express = require('express')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const authenticateToken = require('../middlewares/authMiddleware')

const router = express.Router()

router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body

    // Check if the email already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' })
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create a new user
    const newUser = new User({ email, password: hashedPassword })
    await newUser.save()

    res.status(201).json({ message: 'User registered successfully' })
  } catch (error) {
    console.error('Failed to register user:', error)
    res.status(500).json({ message: 'Failed to register user' })
  }
})

router.post('/emoticons', authenticateToken, async (req, res) => {
  // Only authenticated users can access this route
  // Handle the emoticon creation logic here
})

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    // Check if the email exists
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    // Compare the provided password with the hashed password
    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET)

    res.json({ token })
  } catch (error) {
    console.error('Failed to log in:', error)
    res.status(500).json({ message: 'Failed to log in' })
  }
})

router.post('/logout', (req, res) => {
  // Clear the JWT token cookie
  res.clearCookie('jwt')
  res.json({ message: 'Logout successful' })
})

module.exports = router
