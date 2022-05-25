const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')
const {
    INVALID_PASSWORD,
    BUILDER_ACCOUNT_EXISTS,
    INVALID_COMPANY_NAME,
} = require('../util/response-errors')

const BuilderSchema = new mongoose.Schema({
    username: String,
    companyName: String,
    companyLogo: String,
    projects: [ String ],
    about: String,
    redProfileLink: String,
    CIN: String,
    mobileNumber: String,
    email: String,
    connectLinks: [ String ],
    awards: [ String ],
    state: String,
    city: String,
    zipcode: String,
    street: String,
    location: [ String ],
    isVerified: Boolean,
})

BuilderSchema.plugin(passportLocalMongoose, {
    errorMessages: {
        IncorrectPasswordError: INVALID_PASSWORD,
        IncorrectCompanyNameError: INVALID_COMPANY_NAME,
        MissingPasswordError: INVALID_PASSWORD,
        MissingCompanyNameError: INVALID_COMPANY_NAME,
        CompanyNameExistsError: BUILDER_ACCOUNT_EXISTS,
        NoSaltValueStoredError: INVALID_COMPANY_NAME,
    }
})

module.exports = mongoose.models.Builder || mongoose.model('Builder', BuilderSchema)