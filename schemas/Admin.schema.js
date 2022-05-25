const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')
const {
    INVALID_USERNAME,
    INVALID_PASSWORD,
    ADMIN_ACCOUNT_EXISTS,
} = require('../util/response-errors')

const AdminSchema = new mongoose.Schema({
    username: String,
    emailId: String,
    mobileNumber: String,
})

AdminSchema.plugin(passportLocalMongoose, {
    errorMessages: {
        IncorrectPasswordError: INVALID_PASSWORD,
        IncorrectUsernameError: INVALID_USERNAME,
        MissingPasswordError: INVALID_PASSWORD,
        MissingUsernameError: INVALID_USERNAME,
        UserExistsError: ADMIN_ACCOUNT_EXISTS,
        NoSaltValueStoredError: INVALID_USERNAME,
    },
})

module.exports = mongoose.models.Admin || mongoose.model('Admin', AdminSchema)