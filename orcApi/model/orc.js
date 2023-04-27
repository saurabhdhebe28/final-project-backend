let { knex } = require('../config/dbconfig')
module.exports = class orcModel {
    constructor() { }
    addUrlData(data) {
        return knex('orcData').insert(data)
    }
}