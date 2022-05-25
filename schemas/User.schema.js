const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')
const {
    USER_ACCOUNT_DOESNT_EXIST,
    INVALID_USERNAME,
    INVALID_PASSWORD,
    USER_ACCOUNT_EXISTS,
} = require('../util/response-errors')

const UserSchema = new mongoose.Schema({
    isVerified: Boolean,
    location: [ String ],
    username: String,
    emailId: String,
    mobileNumber: String,
    wishList: [ String ],
    isActive: Boolean,
    redList: [ Object ]
})

UserSchema.plugin(passportLocalMongoose, {
    errorMessages: {
        IncorrectPasswordError: INVALID_PASSWORD,
        IncorrectUsernameError: INVALID_USERNAME,
        MissingPasswordError: INVALID_PASSWORD,
        MissingUsernameError: INVALID_USERNAME,
        UserExistsError: USER_ACCOUNT_EXISTS,
        NoSaltValueStoredError: USER_ACCOUNT_DOESNT_EXIST,
    },
})

module.exports = mongoose.models.User || mongoose.model('User', UserSchema)