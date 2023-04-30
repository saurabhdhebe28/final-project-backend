const express = require('express')
const router = express.Router()
const voucherController = new (require('../controller/vouchersController')) ()

router.post('/createVoucher',voucherController.addVoucher)

module.exports = router