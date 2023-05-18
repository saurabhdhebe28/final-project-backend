const express = require('express')
const offerRoute = express.Router()
const offerController = new (require('../controller/offersController'))()

offerRoute.post('/create-offer', offerController.addOffer);
offerRoute.get('/get-offers', offerController.getOffers);
offerRoute.post('/assign-offer',offerController.assign);
offerRoute.get('/get-assign-offer',offerController.getAssign);
offerRoute.post('/redeem-offer', offerController.redeemOffer);
offerRoute.get('/redeem-list', offerController.redeemList);
offerRoute.get('/get-by-month',offerController.getChart)

module.exports = offerRoute