let userModel = new (require('../model/userModel'))
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = class userAuthService {
    constructor() { }
    async signUp(param) {
        let checkEmail = await userModel.getUserByEmail(param.emailId).catch((err) => {
            return { error: err }
        })

        if (!checkEmail || checkEmail.error) {
            return {
                data: {
                    status: false,
                    data: checkEmail.error.sqlMessage
                }
            }
        }
        if (checkEmail.length != 0) {
            return {
                data: {
                    status: false,
                    data: 'This email id is already existed'
                }
            }
        }
        try {
            let encryptPassword = await bcrypt.hash(param.password, 10)
            param.password = encryptPassword
        } catch (error) {
            return {
                data: {
                    status: false,
                    data: error
                }
            }
        }
        let add = await userAuthModel.signUp(param).catch((err) => {
            return { error: err }
        })
        if (!add || add.error) {
            return {
                data: {
                    status: false,
                    data: add.error.sqlMessage
                }
            }
        }
        return {
            data: {
                status: true,
                data: 'Account Created Successfully'
            }
        }
    }

    async login(param) {

        let checkUser = await userAuthModel.getUserByEmail(param.emailId).catch((err) => {
            return { error: err }
        })
        if (!checkUser || checkUser.error) {
            return {
                data: {
                    status: false,
                    data: checkUser.error.sqlMessage
                }
            }
        }
        if (checkUser.length == 0) {
            return {
                data: {
                    status: false,
                    data: "EmailId & password invalid"
                }
            }
        }

        let checkPassword = await bcrypt.compare(param.password, checkUser[0].password).catch((err) => {
            return { error: err }
        })
        if (!checkPassword || checkPassword.error) {
            return {
                data: {
                    status: false,
                    data: 'EmailId & password invalid'
                }
            }
        }
        let Token
        try {
            Token = jwt.sign(checkUser[0].id, process.env.JWTPRIVATEKEY)
        } catch (error) {
            return {
                data: {
                    status: false,
                    data: error
                }
            }
        }
        return {
            data: {
                status: true,
                data: "Login Successfull",
                token: Token
            }
        }


    }
}