let userFormatter = new (require('../formatter/userFormatter'))
let userValidation = new (require('../validation/userValidations'))
let validatorjs = require('validatorjs')
// let userAuthService = new (require('../services/userAuth'))
module.exports = class userAuthController {
    constructor() { }

    async signUp(request, response) {
        let data = userFormatter.signUp(request.body)
        let rules = userValidation.signUp()
        let validator = new validatorjs(data, rules)
        if (validator.fails()) {
            // return response.send(validator.errors)
        }
        // let add = await userAuthService.signUp(data).catch((err) => {

        //     return { error: err }
        // })
        // if (!add || add.error) {
        //     return response.send(add.data)
        // }
        // return response.send(add.data)
    }

    async login(request, response) {
        let data = userFormatter.login(request.body)
        let rules = userValidation.login()
        let validator = new validatorjs(data, rules)
        // if (validator.fails()) {
        //     return response.send(validator.errors)
        // }
        // let login = await userAuthService.login(data).catch((err) => {
        //     return { error: err }
        // })
        // if (!login || login.error) {
        //     return response.send(login.data)
        // }
        // return response.send(login.data)
    }
}