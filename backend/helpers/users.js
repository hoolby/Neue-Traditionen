require('dotenv').config();
const jwt = require('jsonwebtoken');

const PRIVATE_KEY = process.env.PRIVATE_KEY;

const calculateToken = (userEmail = "") => {
    return jwt.sign({email: userEmail}, PRIVATE_KEY)
}