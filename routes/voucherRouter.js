const express = require('express')
const router = express.Router()
const voucherController = new (require('../controller/vouchersController'))()

router.post('/create-voucher', voucherController.addVoucher);
router.get('/get-voucher', voucherController.getVouchers);
router.post('/assign-voucher', voucherController.assignVoucher);
router.get('/get-assigned-voucher', voucherController.purchasedVoucher);
router.post('/redeem-voucher', voucherController.redeemVoucher);
router.get('/redeem-list', voucherController.redeemList);



module.exports = router