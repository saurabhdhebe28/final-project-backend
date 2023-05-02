const validatorjs = require("validatorjs");
const voucherModel = new (require("../model/voucherModel"))();
const voucherFormatter = new (require("../formatter/vouchersFormatter"))();
const voucherValidator = new (require("../validation/vouchersValidations"))();
const voucherResponse = new (require("../responses/voucherResponse"))();
const voucherService = new (require("../services/voucherService"))();

module.exports = class voucherController {
  constructor() { }
  async addVoucher(req, res) {
    try {
      let data = voucherFormatter.addNewVoucher(req);
      let rules = voucherValidator.addVoucher();
      let validation = new validatorjs(data, rules);
      if (validation.passes()) {
        console.log("Voucher added and validation passes");
        //get firstname ,lastname from localstorage
        // const userData = localStorage.get('userData')
        voucherModel.add(data);  //ye hata baad mein login signup ke baad
        // voucherModel.add(result,userData);
        voucherService.addImage(req, res);
        return voucherResponse.voucherAdded(res, data);
      } else {
        console.log("Voucher not added and validation fails");
        res.status(400).send({status: false,message: "Voucher not added",error: validation.errors,});
      }
    } catch (error) {
      voucherResponse.error400(res, error);
    }
  }

  async getVouchers(req, res) {
    try {
      const result = await voucherModel.getAll();
      if (result) {
        voucherResponse.success(res, result);
      } else {
        res.send({status: "false",message: "No voucher available in Voucher Table"});
      }
    } catch (error) {
      voucherResponse.error400(res, error);
    }
  }

  async redeemVoucher(req, res) {
    try {
      const result = await voucherModel.getByCode(req);
      if (result) {
        if (result.status == 'available') {
          await voucherModel.updateStatus(req);
          const data = await voucherModel.getAll()
          res.send({ status: 'true', data, message: 'Voucher redeemed succesfully' })
        } else if (result.status == 'unavailable') {
          res.send({ status: 'true', data, message: 'Voucher already redeemed' })
        }
      } else {
        res.send({ status: 'true', message: 'Voucher Code Not Found' })
      }
    } catch (error) {
      voucherResponse.error400(res, error);
    }
  }
};
