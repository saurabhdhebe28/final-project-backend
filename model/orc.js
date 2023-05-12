// const { of } = require('rxjs')
let knex = require('../connection/knex')
module.exports = class orcModel {
    constructor() { }
    addUrlData(data) {
        return knex('orcData').insert(data)
    }
    orcDataList(id) {
        return knex.select('requestedBy', 'signedBy', 'totalCounter', 'sdcTime', 'tin', 'locationName', 'address', 'totalAmount', 'city', 'transactionTypeCounter', 'location').from('orcData').where('user_id', id).orderBy('createdAt', 'desc');
    }
    OcrListBysearch(requestedBy, tin, id) {

        if (requestedBy && tin) {
            return knex.select('requestedBy', 'signedBy', 'totalCounter', 'sdcTime', 'tin', 'locationName', 'address', 'totalAmount', 'city', 'transactionTypeCounter', 'location').from('orcData').where({
                'requestedBy': requestedBy,
                'user_id': id
            }).andWhere({
                'tin': tin,
                'user_id': id
            }).orderBy('createdAt', 'desc');
        }
        if (requestedBy || tin) {

            return knex.select('requestedBy', 'signedBy', 'totalCounter', 'sdcTime', 'tin', 'locationName', 'address', 'totalAmount', 'city', 'transactionTypeCounter').from('orcData').where({
                'requestedBy': requestedBy,
                'user_id': id

            }).orWhere({
                'tin': tin,
                'user_id': id
            }).orderBy('createdAt', 'desc');
        }
    }

}