const cheerio = require('cheerio')
let orcRules = new (require('../validation/orc'))
const validatorjs = require('validatorjs')
// const { val } = require('cheerio/lib/api/attributes')
let orcModel = new (require('../model/orc'))
let moment = require('moment')
let { createShortUrl } = require('../helper/shortUrl')

// const orcRules = require('../validator/orc')

module.exports = class Orc {
    constructor() { }
    async getHtmlTemplate(url) {
        let htmlSyntax
        let value
        try {
            htmlSyntax = await fetch(url)

            value = await htmlSyntax.text()

        } catch (error) {
            return {
                data: {
                    status: false,
                    data: error.message
                }
            }
        }
        return {
            data: {
                status: true,
                data: value
            }
        }
    }

    async addOcrByfile(param) {
        if (!param.file || !param.htmlTemplate || (typeof param.file != 'object')) {
            return {
                data: {
                    status: false,
                    data: 'Required Data Not Found Please try with Accurate File'
                }
            }
        }
        let fileInfo = param.file
        let fileName = fileInfo.name
        let htmlContent = param.htmlTemplate
        let folderPath = '/home/mohif/mohif/finalproject/final-project-backend'
        let uploadPath = folderPath + '/public' + '/ocrUploads/' + fileName
        let dbPath = uploadPath.slice(52)
        let $ = cheerio.load(htmlContent)
        let urlData = {
            requestedBy: $('#requestedByLabel').text().trim(),
            signedBy: $('#signedByLabel').text().trim(),
            totalCounter: $('#totalCounterLabel').text().trim(),
            // sdcTime: $('#sdcDateTimeLabel').text().trim(),
            // sdcTime: await STR_TO_DATE($('#sdcDateTimeLabel').text().trim(), '%d.%m.%Y. %H:%i:%s'),
            sdcTime: await moment($('#sdcDateTimeLabel').text().trim(), 'DD.MM.YYYY. HH:mm:ss').format('YYYY-MM-DD HH:mm:ss'),
            tin: $('#tinLabel').text().trim(),
            locationName: $('#shopFullNameLabel').text().trim(),
            totalAmount: $('#totalAmountLabel').text().trim(),
            address: $('#addressLabel').text().trim(),
            city: $('#cityLabel').text().trim(),
            transactionTypeCounter: $('#transactionTypeCounterLabel').text().trim(),
            location: dbPath
        }

        try {
            let rules = orcRules.orcDataObject()
            let validate = new validatorjs(urlData, rules)
            if (validate.fails()) {
                return {
                    data: {
                        status: false,
                        data: 'This input doesnt contain the expected value please enter proper url'
                    }
                }
            }
        } catch (error) {
            return {
                data: {
                    status: false,
                    data: error
                }
            }
        }

        let addData = await orcModel.addUrlData(urlData).catch((err) => {
            return { error: err }
        })
        if (!addData || addData.error) {
            return {
                data: {
                    status: false,
                    data: addData.error.sqlMessage
                }
            }
        }
        try {
            fileInfo.mv(uploadPath)
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
                data: 'Data inserted'
            }
        }

    }
    async addUrl(url) {
        let htmlSyntax
        let value
        try {
            htmlSyntax = await fetch(url)
            value = await htmlSyntax.text()

        } catch (error) {
            console.log(error,'error')
            return {
                data: {
                    status: false,
                    data: error.message
                }
            }
        }

        let $ = cheerio.load(value)
        let urlData = {
            requestedBy: $('#requestedByLabel').text().trim(),
            signedBy: $('#signedByLabel').text().trim(),
            totalCounter: $('#totalCounterLabel').text().trim(),
            // sdcTime: $('#sdcDateTimeLabel').text().trim(),
            // sdcTime: await STR_TO_DATE($('#sdcDateTimeLabel').text().trim(), '%d.%m.%Y. %H:%i:%s'),
            sdcTime: await moment($('#sdcDateTimeLabel').text().trim(), 'DD.MM.YYYY. HH:mm:ss').format('YYYY-MM-DD HH:mm:ss'),
            tin: $('#tinLabel').text().trim(),
            locationName: $('#shopFullNameLabel').text().trim(),
            totalAmount: $('#totalAmountLabel').text().trim(),
            address: $('#addressLabel').text().trim(),
            city: $('#cityLabel').text().trim(),
            transactionTypeCounter: $('#transactionTypeCounterLabel').text().trim(),
            location: url
        }
        let rules = await orcRules.orcDataObject()
        let validate = await new validatorjs(urlData, rules)
        if (validate.fails()) {
            return {
                data: {
                    status: false,
                    data: 'This url doesnt contain the expected value please enter proper url'
                }
            }
        }
        let addData = await orcModel.addUrlData(urlData).catch((err) => {
            return { error: err }
        })
        if (!addData || addData.error) {
            return {
                data: {
                    status: false,
                    data: addData.error.sqlMessage
                }
            }
        }
        return {
            data: {
                status: true,
                data: 'Data inserted'
            }
        }
    }

    async orcList() {
        let folderPath = '/home/mohif/mohif/finalproject/final-project-backend'
        let data
        try {
            data = await orcModel.orcDataList()
        } catch (error) {
            return {
                data: {
                    status: false,
                    data: error.message
                }
            }
        }
        if (data.length == 0) {
            return {
                data: {
                    status: false,
                    data: 'Not Found'
                }
            }
        }
        for (let a in data) {
            data[a].isUrl = true
            let check = data[a].location.split('/')
            if (check[0] == '') {
                data[a].location = folderPath + data[a].location
                data[a].isUrl = false
            }
        }
        return {
            data: {
                status: true,
                data: data
            }
        }

    }


    async orcListWithSerach(param) {
        let requestedBy = param.requestedBy ? param.requestedBy : ''
        let tin = param.tin ? param.tin : ''
        let search = await orcModel.OcrListBysearch(requestedBy, tin).catch((err) => {
            return { error: err }
        })
        if (!search || search.error) {
            return {
                data: {
                    status: false,
                    data: search.error.sqlMessage
                }
            }
        }
        return {
            data: {
                status: true,
                data: search
            }
        }
    }

}
