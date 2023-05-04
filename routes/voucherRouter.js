const express = require('express')
const router = express.Router()
const voucherController = new (require('../controller/vouchersController')) ()

router.post('/create-voucher',voucherController.addVoucher); //done
router.get('/get-voucher',voucherController.getVoucher); //done
router.post('/redeem-voucher',voucherController.redeemVoucher); //done
router.post('/redeem-voucher-list',voucherController.purcahseList);

module.exports = router;