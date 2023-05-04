const express = require('express')
const router = express.Router()
const voucherController = new (require('../controller/vouchersController')) ()

router.post('/create-voucher',voucherController.addVoucher);
router.get('/get-voucher-list',voucherController.getVoucher)
router.get('/purchase-voucher',voucherController.purcahseList)
router.post('/redeem-voucher',voucherController.redeemVoucher);

module.exports = router