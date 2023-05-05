
let jwt = require('jsonwebtoken')
require('dotenv').config()
let userAuthModel = new (require('../model/auth'))
 
async function CheckToken(request, response, next) {
    // if ((request.headers && !request.headers.token) || !request.headers) {
    //     return response.send({ status: false, data: 'Token Not Found' })
    // }
    // try {
    //     let payload = jwt.verify(request.headers.token, process.env.JWTPRIVATEKEY)
    //     let data = await userAuthModel.getUserById(payload)
    //     request.userData = data[0]
    //     next()
    // } catch (error) {
    //     return response.send({ status: false, data: 'Token Not valid' })
    // }
next()
}



module.exports = { CheckToken }
