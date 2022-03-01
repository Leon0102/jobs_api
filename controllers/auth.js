const User = require('../models/User');
const {StatusCodes} = require('http-status-codes');
const {BadRequestError} = require('../errors');

const register = async (req, res, next) => {
    // const {name, email, password} = req.body;
    // if(!name || !email || !password) {
    //     throw new BadRequestError('Missing required fields');
    // }
    const user = await User.create({...req.body});
    console.log({user});
    res.status(StatusCodes.CREATED).json({user});
}

const login = async (req, res, next) => {
    res.send('login');
}

module.exports = {
    register,
    login
}