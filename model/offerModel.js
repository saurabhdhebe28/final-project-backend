const knex = require("../connection/knex");

module.exports = class voucherModel {
  constructor() {}

  add(result) {
    //after login change it to add(result,userData){
    console.log("in offer model");
    return knex("offer")
      .insert({
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
      })
  }

 async getAll() {
    return knex('offer').select('*');
  }

  getByCode(req) {
    return knex.select('*').from('offer')
    .where("offerCode", req.body.offerCode)
  }

  updateStatus(req) {
    console.log(req.body,'dfghjkl;kjhg');
    return knex('offer')
      .where("offerCode", req.body.offerCode)
      .update({
        status: "unavailable",
      })
  }
  redeemList() {
    return knex.select('*').from('offer')
      .where("status", "unavailable")
  }
};
