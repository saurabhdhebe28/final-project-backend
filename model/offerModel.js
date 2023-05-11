const knex = require("../connection/knex");

module.exports = class offerModel {
  constructor() {}

  add(result) {
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
        termsAndConditions: result.termsAndConditions
      })
  }

 async getAll() {
    return knex('offer').select('*').orderBy('createdAt','desc')
  }

  

  getById(req) {
    return  knex.select('*')
    .from('purchase_offer')
    .innerJoin('users', 'users.id', 'purchase_offer.user_id')
    .innerJoin('offer', 'offer.offer_id', 'purchase_offer.offer_id')
    .where("purchase_offer_id", req.body.purchaseOfferId)
  }

  assign(req){
    return knex('purchase_offer').insert({
      user_id:req.body.userId,
      offer_id:req.body.offerId,
      status:'Available'
    })
  }

  checkUser(req){
    return knex('users').select('*').where({id:req.body.userId})
  }

  checkOffer(req){
    return knex('offer').select('*').where({offer_id:req.body.offerId})
  }

  getAssigned(){
    return knex.select('*')
    .from('purchase_offer')
    .innerJoin('users', 'users.id', 'purchase_offer.user_id')
    .innerJoin('offer', 'offer.offer_id', 'purchase_offer.offer_id').orderBy('purchase_offer_id','desc')
  }

  updateStatus(req) {
    return knex.select('*')
    .from('purchase_offer')
    .innerJoin('users', 'users.id', 'purchase_offer.user_id')
    .innerJoin('offer', 'offer.offer_id', 'purchase_offer.offer_id')
      .where("purchase_offer_id", req.body.purchaseOfferId)
      .update({
        status: "Unavailable",
      })
  }
  redeemList() {
    return knex.select('*')
    .from('purchase_offer')
    .innerJoin('users', 'users.id', 'purchase_offer.user_id')
    .innerJoin('offer', 'offer.offer_id', 'purchase_offer.offer_id')
      .where("status", "Unavailable").orderBy('purchase_offer_id','desc')
  }
};
