const express = require('express')
const router = express.Router()
const offerController = new (require('../controller/offersController')) ()

router.post('createOffer',offerController.addOffer)

module.exports = router