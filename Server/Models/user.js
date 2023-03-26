const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const Order = require('./order');
const { v4: uuidv4 } = require('uuid');
const Schema = mongoose.Schema;

const userSchema = new Schema({

    username: {
        type: String,
        required: [true, "Please provide a username "]
    },
    email: {
        type: String,
        required: [true, 'Please provide a email '],
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    role: {
        type: String,
        default: "user",
        enum: ["user", "admin"]
    },
    password: {
        type: String,
        minlength: [6, "Please provide a password with min length : 6 "],
        required: [true, "Please provide a password"],
        select: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    likedProducts: [{
        type: mongoose.Schema.ObjectId,
        ref: "Product"
    }],
    about: {
        type: String
    },
    profile_image: {
        type: String,
        default: 'default.jpg'
    },
    blocked: {
        type: Boolean,
        default: false
    },
    resetPasswordToken: {
        type: String
    },
    resetPasswordExpire: {
        type: Date
    }

})

userSchema.methods.generateJwtFromUser = function () {

    const { JWT_SECRET_KEY } = process.env;

    const payload = {
        id: this._id,
        name: this.name,
        email: this.email
    };

    const token = jwt.sign(payload, JWT_SECRET_KEY);

    return token

}


userSchema.pre('save', function (next) {

    if (!this.isModified("password")) {
        next()
    }

    bcrypt.genSalt(10, (err, salt) => {

        if (err) next(err);

        bcrypt.hash(this.password, salt, (err, hash) => {
            if (err) next(err);
            this.password = hash
            next()
        });
    });

})

userSchema.post('save', async function () {

    const order = await Order.findOne({ user: this._id, complete: false })

    if (!order) {

        await Order.create({
            user: this._id,
            complete: false,
            transaction_id: uuidv4()

        })
    }

})


module.exports = mongoose.model("User", userSchema)