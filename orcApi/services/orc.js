const cheerio = require('cheerio')
// const { val } = require('cheerio/lib/api/attributes')
let orcModel = new (require('../model/orc'))
let moment = require('moment')

module.exports = class Orc {
    constructor() { }
    async addUrl(url) {
        let htmlSyntax
        try {
            htmlSyntax = await fetch(url)
        } catch (error) {
            return {
                statusCode: 400,
                data: {
                    status: true,
                    data: error.message
                }
            }
        }


        let value = await htmlSyntax.text()
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
        let addData = await orcModel.addUrlData(urlData).catch((err) => {
            return { error: err }
        })
        console.log(addData)
        if (!addData || addData.error) {
            return {
                statusCode: 501,
                data: {
                    status: true,
                    data: addData.error.sqlMessage
                }
            }
        }
        return {
            statusCode: 200,
            data: {
                status: false,
                data: 'Data inserted'
            }
        }
    }
}


