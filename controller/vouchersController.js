const validatorjs = require("validatorjs");
const voucherModel = new (require("../model/voucherModel"))();
const voucherFormatter = new (require("../formatter/vouchersFormatter"))();
const voucherValidator = new (require("../validation/vouchersValidations"))();
const voucherResponse = new (require("../responses/voucherResponse"))();
const voucherService = new (require("../services/voucherService"))();

module.exports = class voucherController {
  constructor() {}
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

  async purchaseVoucher(req,res){
    try {
      const data = await voucherModel.getPurchasedVoucher()
      if (data) {
      return  res.status(200).json({ status: true, data, message: 'fetched assigned succesfully' });
      } else {
      return  res.status(404).json({ status: 'false', message: 'data set is empty' })
      }
    } catch (error) {
      return voucherResponse.error400(res,error)
    }
  }


  async redeemVoucher(req,res){
    try {
      const result = await voucherModel.getById(req);
      if(result){
        if(result[0].status=='Available'){
          await voucherModel.updateStatus(req);
          const data = await voucherModel.getPurchasedVoucher();
          res.send({status:'true',data,message:'redeemed succesfully'})
        }else if(result[0].status=='Unavailable'){
          res.send({status:'true',data,message:'already redeemed'})
        }
      }else{
        res.send({status:'true',message:'Voucher Code Not Found'})
      }
    } catch (error) {
        voucherResponse.error400(res,error);
    }
  }

  async redeemList(req, res) {
    try {
      const result = await voucherModel.getRedeemList();
      if (result) {
        res.send({ status: 'true', data: result, message: 'redeemed datalist' })
      } else {
        res.status(404).json({ status: 'false', message: 'data set is empty' })
      }
    } catch (error) {
      return offerResponse.error400(res, error)
    }
  }
};
