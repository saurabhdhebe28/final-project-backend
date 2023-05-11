const https = require('https')
const cheerio = require('cheerio')
let validatorjs = require('validatorjs')
// const { data } = require('cheerio/lib/api/attributes')
let userAuthService = new (require('../services/userAuth'))
let orcRules = new (require('../validation/orc'))
let orcService = new (require('../services/orc'))
let orcFormatter = new (require('../formatter/orc'))
module.exports = class Orc {
    constructor() { }
    async getHtmlTemplate(request, response) {
        let rules = await orcRules.url()
        let validate = await new validatorjs(request.body, rules)
        if (validate.fails()) {
            return response.send(validate.errors)
        }
        let get = await orcService.getHtmlTemplate(request.body.url).catch((err) => {
            return {
                error: err
            }
        })
        if (!get || get.error) {
            response.send(get.data)
        }
        response.send(get.data)
    }
    async addorcFile(request, response) {
        if (!request.files || !request.body.htmlTemplate) {
            return response.send({ status: false, data: 'required Contained Not Found' })
        }
        let data
        try {
            data = orcFormatter.ocrFileData(request.files, request.body)
            let rules = orcRules.orcFile()
            let validate = new validatorjs(data, rules)
            if (validate.fails()) {
                return response.send(validate.errors)
            }
        } catch (error) {

            return response.send({ status: false, data: error })
        }

        let addFile = await orcService.addOcrByfile(data).catch((err) => {
            return { error: err }
        })
        if (!addFile || addFile.error) {
            return response.send(addFile.data)
        }
        return response.send(addFile.data)

    }
    async urlData(request, response) {
        let rules = await orcRules.url()
        let validate = await new validatorjs(request.body, rules)
        if (validate.fails()) {
            return response.send(validate.errors)
        }
        let add = await orcService.addUrl(request.body.url).catch((err) => {
            return { error: err }
        })
        console.log(add);
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

    async downLoadFile(request, response) {
        let filePath = request.query.filePath
        if (!filePath) {
            return response.send({ status: false, data: "File Path Not Found" })
        }

        response.download(filePath, (err) => {
            if (err) {
                return response.send({ status: false, data: 'Something went wrong' })
            }
        })

    }
}

