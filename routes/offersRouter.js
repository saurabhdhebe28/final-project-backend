const express = require('express')
const offerRoute = express.Router()
const offerController = new (require('../controller/offersController')) ()

offerRoute.post('/create-offer',offerController.addOffer);
offerRoute.get('/get-offers',offerController.getOffers);
offerRoute.get('/purchase-offers',offerController.getOffers);
offerRoute.post('/redeem-offer',offerController.redeemOffer);
offerRoute.post('/purchase',offerController.purcahseList)

module.exports = offerRoute