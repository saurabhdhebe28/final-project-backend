const knex = require('../connection/knex')

module.exports = class voucherModel{
    constructor() {}

    add(result) {
        console.log('in offer model')
        return knex("offer").insert({
            offerTitle: result.offerTitle,
            offerImage: result.offerImage,
            offerCode: result.offerCode,
            merchants: result.merchants,
            brands: result.brands,
            minAmount:result.minAmount,
            offerType: result.offerType,
            amtLimit: result.limit,
            offerExpiryDate:result.offerExpiry,
            termsAndConditions:result.termsAndConditions
        }).then(()=>console.log('data added in offer table'))
      }
}