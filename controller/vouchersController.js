const validatorjs = require('validatorjs')
const voucherFormatter = new (require('../formatter/vouchersFormatter'))()
const voucherValidator = new (require('../validation/vouchersValidations'))
const voucherResponse = new (require('../responses/voucherResponse'))()
const voucherService = new (require('../services/voucherService'))()

module.exports = class voucherController {
    constructor() { }
    async addVoucher(req, res) {
        try {
            let data = voucherFormatter.addNewVoucher(req)
            let rules = voucherValidator.addVoucher()
            let validation = new validatorjs(data,rules)
            if (validation.passes()) {
                console.log("Validation passes");
                voucherService.addImage(req, res)
                return voucherResponse.voucherAdded(res, data)
            }
            else {
                console.log('Validation fails')
                res.status(400).send({ status: false, message: 'Voucher not added', error: validation.errors })
            }
        }
        catch (error) {
            voucherResponse.error400(res, error);
        }
    }
}