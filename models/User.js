const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        minlength: 3,
        maxlength: 50,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        minlength: 5,
        maxlength: 255,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email',   
            ],
        unique: true,
    },
    password:{
        type: String,
        required: true,
        minlength: 8,
    }
});

 UserSchema.pre('save', async function(next) {
    const user = this;
    if(user.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(user.password, salt);
        user.password = hash;
    }
    next();
});

// UserSchema.methods.getName = function() {
//     return this.name;
// }

UserSchema.methods.createJWT = function(){
    return jwt.sign({userId: this._id,name: this.name}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_LIFETIME});
}

UserSchema.methods.comparePassword = async function(canditatePassword) {
    const isMatch = await bcrypt.compare(canditatePassword, this.password);
    return isMatch;
}


module.exports = mongoose.model('User', UserSchema);