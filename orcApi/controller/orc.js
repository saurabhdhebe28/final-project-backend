const https = require('https')
const cheerio = require('cheerio')
let validatorjs = require('validatorjs')
let orcRules = new (require('../validator/orc'))
let orcService = new (require('../services/orc'))
module.exports = class Orc {
    constructor() { }

    async urlData(request, response) {
        let rules = await orcRules.url()
        let validate = await new validatorjs(request.body, rules)
        if (validate.fails()) {
            return response.status(406).send(validate.errors)
        }
        let add = await orcService.addUrl(request.body.url).catch((err) => {
            return { error: err }
        })
        console.log(add)
        if (!add || add.error) {
            return response.status(add.statusCode).send(add.data)
        }
        return response.status(add.statusCode).send(add.data)

    }
}

