let { knex } = require('../config/dbconfig')
module.exports = class userAuthModel {
    constructor() { }

    signUp(param) {
        return knex('users').insert(param)
    }
    getUserByEmail(email) {
        return knex.select('id', 'firstName', 'lastName', 'emailId', 'mobileNumber', 'password').from('users').where('emailId', email)
    }
    getUserById(id) {
        return knex.select('id', 'firstName', 'lastName', 'mobileNumber').from('users').where('id', id)
    }
}