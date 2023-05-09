const https = require('https')
const cheerio = require('cheerio')
let validatorjs = require('validatorjs')
let userAuthService = new (require('../services/userAuth'))
let orcRules = new (require('../validation/orc'))
let orcService = new (require('../services/orc'))
module.exports = class Orc {
    constructor() { }

    async urlData(request, response) {
        let rules = await orcRules.url()
        let validate = await new validatorjs(request.body, rules)
        if (validate.fails()) {
            return response.send(validate.errors)
        }
        let add = await orcService.addUrl(request.body.url).catch((err) => {
            return { error: err }
        })
        if (!add || add.error) {
            return response.send(add.data)
        }
        return response.send(add.data)

    }

    async orcList(request, response) {
        let add = await orcService.orcList().catch((err) => {
            return { error: err }
        })
        if (!add || add.error) {
            return response.send(add.data)
        }
        return response.send(add.data)
    }
    async orcListWithSearch(request, response) {
        let get = await orcService.orcListWithSerach(request.query).catch((err) => {
            return { error: err }
        })
        if (!get || get.error) {
            return response.send(get.data)
        }
        return response.send(get.data)

    }
}

