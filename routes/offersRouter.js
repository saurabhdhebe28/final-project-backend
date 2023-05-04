const express = require('express')
const offerRoute = express.Router()
const offerController = new (require('../controller/offersController')) ()

offerRoute.post('/create-offer',offerController.addOffer);
offerRoute.get('/get-offer-list',offerController.getOffers)
offerRoute.post('/redeem-offer',offerController.redeemOffer);
offerRoute.post('/purchase',offerController.purcahseList)

module.exports = offerRoute