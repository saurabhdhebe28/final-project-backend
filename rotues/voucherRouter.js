const express = require('express')
const router = express.Router()
const voucherController = new (require('../controller/vouchersController')) ()

router.post('/create-voucher',voucherController.addVoucher)

module.exports = router