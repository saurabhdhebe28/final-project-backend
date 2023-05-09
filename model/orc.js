// const { of } = require('rxjs')
let knex = require('../connection/knex')
module.exports = class orcModel {
    constructor() { }
    addUrlData(data) {
        return knex('orcData').insert(data)
    }
    orcDataList() {
        return knex.select('requestedBy', 'signedBy', 'totalCounter', 'sdcTime', 'tin', 'locationName', 'address', 'totalAmount', 'city', 'transactionTypeCounter').from('orcData').orderBy('createdAt', 'desc');
    }
    OcrListBysearch(requestedBy, tin) {

        if (requestedBy && tin) {
            return knex.select('requestedBy', 'signedBy', 'totalCounter', 'sdcTime', 'tin', 'locationName', 'address', 'totalAmount', 'city', 'transactionTypeCounter').from('orcData').where({
                'requestedBy': requestedBy
            }).andWhere({
                'tin': tin
            }).orderBy('createdAt', 'desc');
        }
        if (requestedBy || tin) {

            return knex.select('requestedBy', 'signedBy', 'totalCounter', 'sdcTime', 'tin', 'locationName', 'address', 'totalAmount', 'city', 'transactionTypeCounter').from('orcData').where({
                'requestedBy': requestedBy
            }).orWhere({
                'tin': tin
            }).orderBy('createdAt', 'desc');
        }
    }

}