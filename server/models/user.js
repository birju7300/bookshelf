const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../config/config').get(process.env.NODE_ENV)
const SALT_I = 10

const userSchema = mongoose.Schema({
    email:{
        type:String,
        required:true,
        trim:true,
        unique:1
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    firstName:{
        type: String,
        maxlength:100
    },
    lastName:{
        type: String,
        maxlength:100
    },
    role:{
        type: Number,
        default:0
    },
    token:{
        type:String
    }
})

userSchema.pre('save',function(next){
    var user = this
    if(user.isModified('password')){
        bcrypt.genSalt(SALT_I,function(err,salt){
            if(err) return next(err)
            bcrypt.hash(user.password,salt,function(err, hashedPassword){
                if(err) return next(err)
                user.password = hashedPassword
                next()
            })
        })
    }else{
        next()
    }
})

userSchema.methods.comparePassword = function (candidatePassword, cb){
    bcrypt.compare(candidatePassword,this.password,function(err, isMatched){
        if(err) return cb(err)
        cb(null,isMatched)        
    })
}

userSchema.statics.findByToken = function (token, cb) {
    var user = this
    jwt.verify(token, config.SECRET, function (err, userId) {

        user.findOne({ '_id': userId, 'token': token }, function (err, user) {
            if (err) return cb(err)
            cb(null, user)

        })
    })
}

userSchema.methods.deleteToken = function(token, cb){
    var user = this
    user.update({$unset:{token:1}},function(err,user){
        if(err) return cb(err)
        cb(null,user)
    })
}
userSchema.methods.generateToken = function(cb){
    var user = this
    var token = jwt.sign(user._id.toHexString(),config.SECRET)
    user.token = token
    user.save(function(err,user){
        if(err) return cb(err)
        cb(null, user)
    })
}

const User = mongoose.model('User', userSchema)

module.exports = { User }
