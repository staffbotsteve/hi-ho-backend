const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protect routes
exports.protect = async (req, res, next) => {
    let token;

    if(
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ){
        // set token from Bearer token in header
        token = req.headers.authorization.split(' ')[1]
    }

    if(!token){
        return res.status(401).json({
            success: false,
            error: 'Not authorized to access this route'
        })
    }

    try {
        // verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        console.log(decoded);

        req.user = await User.findById(decoded.id)

        next();
    } catch (err) {
        res.status(401).json({
            success: false,
            error: 'Not authorized to access this route'
        })
    }
}