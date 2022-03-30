const User = require('../models/User');
const {StatusCodes} = require('http-status-codes');
const {BadRequestError, UnauthenticatedError} = require('../errors');
const jwt = require('jsonwebtoken');

const register = async (req, res, next) => {
    // const {name, email, password} = req.body;
    // if(!name || !email || !password) {
    //     throw new BadRequestError('Missing required fields');
    // }

    // const {name, email, password} = req.body;
    // const salt = bcrypt.genSaltSync(10);
    // const hash = bcrypt.hashSync(password, salt);

    // const tempUser = {name, email, password: hash};

    // const user = await User.create({...tempUser});
    // console.log({user});
    const user = await User.create({...req.body});
    const token = user.createJWT();
    res.status(StatusCodes.CREATED).json({user:{name:user.name},token});
}

const login = async (req, res, next) => {
    const {email, password} = req.body;
    if(!email || !password) {
        throw new BadRequestError('Missing required fields');
    }
    const user = await User.findOne({email});
    if(!user){
        throw new UnauthenticatedError('Invalid credentials');
    }
    const isPasswordCorrect = await user.comparePassword(password);
    if(!isPasswordCorrect) {
        throw new UnauthenticatedError('Invalid credentials');
    }
    // compare password
    const token = user.createJWT();
    res.status(StatusCodes.OK).json({user:{name:user.name},token});
}

module.exports = {
    register,
    login
}