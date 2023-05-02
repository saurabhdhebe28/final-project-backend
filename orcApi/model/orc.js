// const { of } = require('rxjs')
let { knex } = require('../config/dbconfig')
module.exports = class orcModel {
    constructor() { }
    addUrlData(data) {
        return knex('orcData').insert(data)
    }
    orcDataList() {
        return knex.select('requestedBy', 'signedBy', 'totalCounter', 'sdcTime', 'tin', 'locationName', 'address', 'totalAmount', 'city', 'transactionTypeCounter').from('orcData')
    }
    OcrListBysearch(requestedBy, tin) {
        console.log(requestedBy, tin)
        if (requestedBy && tin) {
            console.log('And')
            return knex.select('requestedBy', 'signedBy', 'totalCounter', 'sdcTime', 'tin', 'locationName', 'address', 'totalAmount', 'city', 'transactionTypeCounter').from('orcData').where({
                'requestedBy': requestedBy
            }).andWhere({
                'tin': tin
            })
        }
        if (requestedBy || tin) {
            console.log('Or')
            return knex.select('requestedBy', 'signedBy', 'totalCounter', 'sdcTime', 'tin', 'locationName', 'address', 'totalAmount', 'city', 'transactionTypeCounter').from('orcData').where({
                'requestedBy': requestedBy
            }).orWhere({
                'tin': tin
            })
        }
    }

}