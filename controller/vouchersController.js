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
            console.log(data,"hello");
            console.log("hi");
            let rules = voucherValidator.addVoucher()
            // console.log(rules)
            let validation = new validatorjs(data,rules)
            console.log(validation.fails())
            if (validation.passes()) {
                console.log("Validation passes");
                voucherService.addImage(req, res, data)
                return voucherResponse.voucherAdded(res, data)
            }
            else if (validation.fails()) {
                console.log('Validation fails')
            }
            else {
                res.status(400).send({ status: false, message: 'Voucher not added', error: validation.errors })
            }
        }
        catch (error) {
            res.status(500).send({ status: false, message: error.message })
        }
    }
}