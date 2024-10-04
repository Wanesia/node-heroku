const express = require("express");
const { registerUser } = require("../controllers/authController");
const { loginUser } = require('../controllers/authController');

const router = express.Router();

// POST
//Register a new user
router.post("/register", registerUser);

//login a user
router.post('/login', loginUser);

//UPDATE

module.exports = router;
