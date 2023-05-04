const express = require('express')
const router = express.Router()
const voucherController = new (require('../controller/vouchersController')) ()

router.post('/create-voucher',voucherController.addVoucher);
router.get('/redeem-voucher',voucherController.getVoucher);
router.post('/redeem-voucher',voucherController.redeemVoucher);
router.post('/redeem-voucher-list',voucherController.purcahseList);

module.exports = router;