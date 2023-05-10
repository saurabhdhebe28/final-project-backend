let authFormatter = new (require('../formatter/userAuth'))
let authRules = new (require('../validation/userAuth'))
let validatorjs = require('validatorjs')
let userAuthService = new (require('../services/userAuth'))
module.exports = class userAuthController {
    constructor() { }

    async signUp(request, response) {
        let data = authFormatter.signUp(request.body)
        let rules = authRules.signUp()
        let validator = new validatorjs(data, rules)
        if (validator.fails()) {
            return response.send(validator.errors)
        }
        let add = await userAuthService.signUp(data).catch((err) => {
            return { error: err }
        })
        if (!add || add.error) {
            return response.send(add.data)
        }
        return response.send(add.data)
    }

    async login(request, response) {
        let data = authFormatter.login(request.body)
        let rules = authRules.login()
        let validator = new validatorjs(data, rules)
        if (validator.fails()) {
            return response.send(validator.errors)
        }
        let login = await userAuthService.login(data).catch((err) => {
            return { error: err }
        })

        if (!login || login.error) {
            return response.send(login.data)
        }
        return response.send(login.data)
    }
}