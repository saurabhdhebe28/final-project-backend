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
      let data = await voucherFormatter.addNewVoucher(req);
      let rules = await voucherValidator.addVoucher();
      let validation = new validatorjs(data, rules);
      if (validation.passes()) {
        await voucherModel.add(data);
        await voucherService.addImage(req, res);
        return voucherResponse.voucherAdded(res, data);
      } else {
        res
          .status(400)
          .send({
            status: false,
            message: "Voucher not added",
            error: validation.errors.errors,
          });
      }
    } catch (error) {
      return voucherResponse.error400(res, error);
    }
  }

  async getVouchers(req, res) {
    try {
      const result = await voucherModel.getAll();
      if (result) {
        return voucherResponse.success(res, result);
      } else {
        return res.send({
          status: "false",
          message: "No Data in Voucher Table",
        });
      }
    } catch (error) {
      return voucherResponse.error400(res, error);
    }
  }

  async assignVoucher(req, res) {
    try {
      const userInfo = await voucherModel.checkUser(req);
      const voucherInfo = await voucherModel.checkVoucher(req);
      if (userInfo && voucherInfo) {
        await voucherModel.assignVoucher(req);
        return res.status(200).json({ status: true, message: 'Data added succesfully in Assigned table' })
      } else {
        return res.status(404).json({ status: true, message: 'Invalid id for user or offer' })
      }
    } catch (error) {
      return voucherResponse.error400(res, error)
    }
  }
  async purchasedVoucher(req, res) {
    try {
      const data = await voucherModel.getPurchasedVoucher()
      if (data) {
        return res.status(200).json({ status: true, data, message: 'Fetched assigned voucher succesfully' });
      } else {
        return res.status(404).json({ status: 'false', message: 'Data set is empty' })
      }
    } catch (error) {
      return voucherResponse.error400(res, error)
    }
  }


  async redeemVoucher(req, res) {
    try {
      const result = await voucherModel.getById(req);
      if(result){
        if(result[0].status=='Available'){
          await voucherModel.updateStatus(req);
          const data = await voucherModel.getPurchasedVoucher();
          
          res.send({ status: 'true', data, message: 'Voucher redeemed succesfully' })
        } else if (result[0].status == 'Unavailable') {
          res.send({ status: 'true', data, message: ' Voucher already redeemed' })
        }
      } else {
        res.send({ status: 'true', message: 'Voucher Code Not Found' })
      }
    } catch (error) {
      voucherResponse.error400(res, error);
    }
  }

  async redeemList(req, res) {
    try {
      const result = await voucherModel.getRedeemList();
      if (result) {
        res.send({ status: 'true', data: result, message: 'Voucher redeemed datalist' })
      } else {
        res.status(404).json({ status: 'false', message: 'Data set is empty' })
      }
    } catch (error) {
      return voucherResponse.error400(res, error)
    }
  }
};