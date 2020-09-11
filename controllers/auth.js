const User = require('../models/User');

// @desc    Register User
// @route   POST /api/v1/auth/register
// @access  Public
exports.register = async (req,res,next) => {
    try {
        const { 
            firstName,
            lastName,
            email,
            phone,
            password,
            jobTitle,
            minSalary
        } = req.body;

        // Create User
        const user = await User.create({
            firstName,
            lastName,
            email,
            phone,
            password,
            jobTitle,
            minSalary 
        });

        // create token
        const token = user.getSignedJwtToken();

        res.status(200).json({
            success: true,
            token
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        })
    }
}

// @desc    Login User
// @route   POST /api/v1/auth/login
// @access  Public
exports.login = async (req,res,next) => {
    try {
        const {email, password} = req.body;

        // Validate email & password
        if(!email || !password){
            return res.status(400).json({
                success: false, 
                error: 'Please provide an email and password'})
        }

        // check for user
        const user = await User.findOne({ email}).select('+password');

        // Validate email & password
        if(!user){
            return res.status(400).json({
                success: false, 
                error: 'Invalid credentials'})
        }

        // check if password matches
        const isMatch = await user.matchPassword(password);

        if(!isMatch){
            return res.status(400).json({
                success: false,
                error: 'Invalid credentials'
            })
        }

        // create token
        const token = user.getSignedJwtToken()

        res.status(200).json({
            success: true,
            token
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        })
    }
    res.status(200).json({ msg: 'Login ....'})
}

// @desc    GET current logged in User 
// @route   GET /api/v1/auth/me
// @access  Private
exports.getMe = async (req,res,next) => {
    try {
        
    const user = await User.findById(req.user.id);
      
    res.status(200).json({
          success: true,
          data: user
    })
    } catch (err) {
        res.status(500).json({
        success: false,
        error: err.message
        })
    }
}

