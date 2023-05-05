const cheerio = require('cheerio')
let orcRules = new (require('../validation/orc'))
const validatorjs = require('validatorjs')
// const { val } = require('cheerio/lib/api/attributes')
let orcModel = new (require('../model/orc'))
let moment = require('moment')

// const orcRules = require('../validator/orc')

module.exports = class Orc {
    constructor() { }
    async addUrl(url) {
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
            transactionTypeCounter: $('#transactionTypeCounterLabel').text().trim()
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
