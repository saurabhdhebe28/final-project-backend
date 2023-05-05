const knex = require('../connection/knex')


module.exports = class voucherModel {
    constructor() { }

    add(result) {               //after login change it to add(result,userData){
        console.log('in offer model')
        console.log('in voucher model')
        return knex("voucher").insert({
            voucherTitle: result.voucherTitle,
            voucherImage: result.voucherImage,
            pointRate: result.pointRate,
            merchants: result.merchants,
            brands: result.brands,
            denominationStep: result.denominationStep,
            denominationStart: result.denominationStart,
            denominationEnd: result.denominationEnd,
            voucherExpiryDate: result.voucherExpiryDate,
            voucherCode: result.voucherCode,
            termsAndConditions: result.termsAndConditions
        })
    }

    getAll() {
        return knex.select('*').from('voucher')
    }

    getByCode(req) {
        return knex.select('*').from('voucher').where('voucherCode', req.body.offerCode)
    }

    updateStatus() {
        return knex.select('*').from('offer').where('voucherCode', req.body.voucherCode).update({
            status: 'unavailable',
        })
    }
}