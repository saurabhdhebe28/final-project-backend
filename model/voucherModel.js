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
        return knex('voucher').select('*').orderBy('voucher_id', 'desc');
    }

    getById(req) {
        console.log('inside model', req.body);
        return knex.select('*')
            .from('purchase_voucher')
            .innerJoin('users', 'users.id', 'purchase_voucher.user_id')
            .innerJoin('voucher', 'voucher.voucher_id', 'purchase_voucher.voucher_id')
            .where("purchase_voucher_id", req.body.purchaseVoucherId)
    }

    assignVoucher(req) {
        return knex('purchase_voucher').insert({
            user_id: req.body.userId,
            voucher_id: req.body.voucherId,
            status: 'Available'
        })
    }

    checkUser(req) {
        return knex('users').select('*').where({ id: req.body.userId })
    }

    checkVoucher(req) {
        return knex('voucher').select('*').where({ voucher_id: req.body.voucherId })
    }

    updateStatus(req) {
        try {
            return knex.select('*')
                .from('purchase_voucher')
                .innerJoin('users', 'users.id', 'purchase_voucher.user_id')
                .innerJoin('voucher', 'voucher.voucher_id', 'purchase_voucher.voucher_id')
                .where("purchase_voucher_id", req.body.purchaseVoucherId).update({
                    status: 'Unavailable',
                })
        } catch (error) {
            console.log('error');
        }
    }
    getPurchasedVoucher() {
        return knex.select('*')
            .from('purchase_voucher')
            .innerJoin('users', 'users.id', 'purchase_voucher.user_id')
            .innerJoin('voucher', 'voucher.voucher_id', 'purchase_voucher.voucher_id').orderBy('purchase_voucher_id', 'desc')
    }
    getRedeemList() {
        return knex.select('*')
            .from('purchase_voucher')
            .innerJoin('users', 'users.id', 'purchase_voucher.user_id')
            .innerJoin('voucher', 'voucher.voucher_id', 'purchase_voucher.voucher_id').where("status", "Unavailable").orderBy('purchase_voucher_id', 'desc')
    }
}