let express = require('express')
const authRouter = express.Router()
let userAuthController = new (require('../controller/userAuth'))


authRouter.post('/signUp', userAuthController.signUp)
authRouter.post('/login', userAuthController.login)


module.exports = { authRouter }