const knex = require('../connection/knex')


module.exports = class voucherModel {
    constructor() { }

    add(result) {
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
        return knex('voucher').select('*');
    }

    getById(req) {
        return knex.select('*')
            .from('purchase_voucher')
            .innerJoin('users', 'users.id', 'purchase_voucher.user_id')
            .innerJoin('voucher', 'voucher.voucher_id', 'purchase_voucher.voucher_id')
            .where("purchase_voucher_id", req.body.purchaseVoucherId)
    }

    updateStatus(req) {
        return knex.select('*')
            .from('purchase_voucher')
            .innerJoin('users', 'users.id', 'purchase_voucher.user_id')
            .innerJoin('voucher', 'voucher.voucher_id', 'purchase_voucher.voucher_id')
            .where("purchase_voucher_id", req.body.purchaseVoucherId).update({
                status: 'Unavailable',
            })
    }
    getPurchasedVoucher(){
        return knex.select('*')
        .from('purchase_voucher')
        .innerJoin('users', 'users.id', 'purchase_voucher.user_id')
        .innerJoin('voucher', 'voucher.voucher_id', 'purchase_voucher.voucher_id')
    }
    getRedeemList(){
        return knex.select('*')
        .from('purchase_voucher')
        .innerJoin('users', 'users.id', 'purchase_voucher.user_id')
        .innerJoin('voucher', 'voucher.voucher_id', 'purchase_voucher.voucher_id').where("status", "Unavailable")
    }
}