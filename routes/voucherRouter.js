const express = require('express')
const router = express.Router()
const voucherController = new (require('../controller/vouchersController'))()

router.post('/create-voucher', voucherController.addVoucher);
router.get('/get-voucher', voucherController.getVouchers);
router.get('/purchase-voucher', voucherController.purchaseVoucher);
router.post('/redeem-voucher', voucherController.redeemVoucher);
router.get('/redeem-list', voucherController.redeemList);



module.exports = router