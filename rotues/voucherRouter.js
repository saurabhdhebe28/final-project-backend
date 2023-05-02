const express = require('express')
const router = express.Router()
const voucherController = new (require('../controller/vouchersController')) ()

router.post('/create-voucher',voucherController.addVoucher);
router.get('/redeem-voucher',voucherController.getVouchers);
router.post('/redeem-voucher',voucherController.redeemVoucher);

module.exports = router