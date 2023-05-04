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
    }).then(() => console.log('data added in voucher table'))
  }

  getAll() {
    return knex.select('*').from('voucher')
  }

  getByCode(req) {
    return knex.select('*').from('voucher').where('voucherCode', req.body.voucherCode)
  }

  getpurchase() {
    return knex.select('*').from('users').innerJoin('purchase_voucher', 'users.id','purchase_voucher.user_id').innerJoin('voucher', 'purchase_voucher.voucher_id', 'voucher.voucher_id');
  }

  getRedeemList() {
    return knex.select('*').from('users').innerJoin('purchase_voucher', 'users.id', 'purchase_voucher.user_id').innerJoin('voucher', 'purchase_voucher.voucher_id',  'voucher.voucher_id').where({status:'Unavailable'})
  }
  updateStatus(req) {
    return knex('voucher')
    .where('voucherCode', '=', req.body.voucherCode)
    .update({
      status: 'Unavailable',
    })
   .then(()=>console.log('updated status'))
  }
}