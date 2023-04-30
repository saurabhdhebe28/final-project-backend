const express = require('express')
const offerRoute = express.Router()
const offerController = new (require('../controller/offersController')) ()

offerRoute.post('/create-offer',offerController.addOffer);
offerRoute.post('/redeem-offer',offerController.redeemOffer);

module.exports = offerRoute