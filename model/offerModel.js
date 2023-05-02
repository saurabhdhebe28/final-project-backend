const knex = require('../connection/knex')

module.exports = class voucherModel {
  constructor() { }

  add(result) {         //after login change it to add(result,userData){
    console.log('in offer model')
    return knex("offer").insert({
      offerTitle: result.offerTitle,
      offerImage: result.offerImage,
      offerCode: result.offerCode,
      merchants: result.merchants,
      brands: result.brands,
      minAmount: result.minAmount,
      offerType: result.offerType,
      amtLimit: result.limit,
      offerExpiryDate: result.offerExpiry,
      termsAndConditions: result.termsAndConditions,
      status: 'available'
      //after login
      //firstName:userData.firstName,
      //lastName:userData.lastName
    }).then(() => console.log('data added in offer table'))
  }

  getAll() {
    return knex.select('*').from('offer').then(() => console.log('Offer list'))
  }

  getByCode(req) {
    return knex.select('*').from('offer').where('offerCode', req.body.offerCode).then(() => console.log('Offer list by OfferCode'))
  }

  updateStatus() {
    return knex.select('*').from('offer').where('offerCode', req.body.offerCode).update({
      status: 'unavailable',
    }).then(() => console.log('Offer unavailable'))
  }
}