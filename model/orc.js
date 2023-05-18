
let knex = require('../connection/knex')
module.exports = class orcModel {
    constructor() { }
    addUrlData(data) {
        return knex('orcData').insert(data)
    }
    orcDataList(id) {
        return knex.select('requestedBy', 'signedBy', 'totalCounter', 'sdcTime', 'tin', 'locationName', 'address', 'totalAmount', 'city', 'transactionTypeCounter', 'location').from('orcData').where('user_id', id).orderBy('createdAt', 'desc');
    }
    OcrListBysearch(requestedBy, tin, city, id) {
        if (requestedBy || tin || city) {
            if (requestedBy && (!tin && !city)) {
                return knex.select('requestedBy', 'signedBy', 'totalCounter', 'sdcTime', 'tin', 'locationName', 'address', 'totalAmount', 'city', 'transactionTypeCounter').from('orcData').where({
                    'requestedBy': requestedBy,
                    'user_id': id
                }).orderBy('createdAt', 'desc');
            }
            if (tin && (!requestedBy && !city)) {
                
                return knex.select('requestedBy', 'signedBy', 'totalCounter', 'sdcTime', 'tin', 'locationName', 'address', 'totalAmount', 'city', 'transactionTypeCounter').from('orcData').where({
                    'tin': tin,
                    'user_id': id
                }).orderBy('createdAt', 'desc');
            }
            if (city && (!requestedBy && !tin)) {
                
                return knex.select('requestedBy', 'signedBy', 'totalCounter', 'sdcTime', 'tin', 'locationName', 'address', 'totalAmount', 'city', 'transactionTypeCounter').from('orcData').where({
                    'city': city,
                    'user_id': id
                }).orderBy('createdAt', 'desc');
            }
        }
        if (requestedBy && tin && !city) {
            return knex.select('requestedBy', 'signedBy', 'totalCounter', 'sdcTime', 'tin', 'locationName', 'address', 'totalAmount', 'city', 'transactionTypeCounter').from('orcData').where({
                'requestedBy': requestedBy,
                'user_id': id
            }).andWhere({
                'tin': tin,
                'user_id': id
            }).orderBy('createdAt', 'desc');
        }
        if (requestedBy && city && !tin) {

            return knex.select('requestedBy', 'signedBy', 'totalCounter', 'sdcTime', 'tin', 'locationName', 'address', 'totalAmount', 'city', 'transactionTypeCounter').from('orcData').where({
                'requestedBy': requestedBy,
                'user_id': id

            }).andWhere({
                'city': city,
                'user_id': id
            }).orderBy('createdAt', 'desc');
        }
        if (city && tin && !requestedBy) {

            return knex.select('requestedBy', 'signedBy', 'totalCounter', 'sdcTime', 'tin', 'locationName', 'address', 'totalAmount', 'city', 'transactionTypeCounter').from('orcData').where({
                'city': city,
                'user_id': id
            }).andWhere({
                'tin': tin,
                'user_id': id
            }).orderBy('createdAt', 'desc');
        }
        if (requestedBy && tin && city) {
            return knex.select('requestedBy', 'signedBy', 'totalCounter', 'sdcTime', 'tin', 'locationName', 'address', 'totalAmount', 'city', 'transactionTypeCounter', 'location').from('orcData').where('requestedBy', requestedBy).where('tin', tin).where('city', city).where('user_id', id).orderBy('createdAt', 'desc');
        }
    }

}