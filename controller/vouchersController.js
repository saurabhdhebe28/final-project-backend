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
        voucherModel.add(data); 
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

  async getVoucher(req, res) {
    try {
      const result = await voucherModel.getAll();
      console.log(result);
      if (result) {
        voucherResponse.success(res,result);
      } else {
        res.send({ status: "false", message: "No voucher in voucher Table" });
      }
    } catch (error) {
      voucherResponse.error400(res, error);
    }
  }

  // async purcahseList(req,res){
  //   try {
  //     let data = await voucherModel.getpurchase()
  //     console.log(data);
  //     if(data){
  //       offerResponse.success(res,data)
  //     }
  //     else{
  //       res.send({status:'false',message:'No purchase has made'})
  //     }
  //   } catch (error) {
      
  //   }
  // }

  async purcahseList(req,res){
    try {
      const result = await voucherModel.getByCode(req);
      console.log('in redeem',result);
      if(result){
        if(result[0].status=='Available'){
          await voucherModel.updateStatus(req);
          const data = await voucherModel.getAll()
          res.send({status:'true',data,message:'redeemed succesfully'})
        }else if(result[0].status=='Unavailable'){
          res.send({status:'true',data,message:'already redeemed'})
        }
      } else {
        res.send({ status: 'true', message: 'Voucher Code Not Found' })
      }
    } catch (error) {
      offerResponse.error400(res, error);
    }
  }
  async redeemVoucher(req,res){
    try {
      const result = await voucherModel.getRedeemList();
      res.send({status:'true',data:result,message:'redeemed data list for voucher'})
    } catch (error) {
      offerResponse.error400(res,error)
    }

  }
  // async redeemVoucher(req, res) {
  //   try {
  //     const result = await voucherModel.getByCode(req);
  //     if (result.length !=0) {

  //       if (result[0].status == 'Available') {
  //         console.log('hello')
  //         await voucherModel.updateStatus(req);
  //         const data = await voucherModel.getRedeemList()
  //         res.send({ status: 'true', data, message: 'Voucher redeemed succesfully' })
  //       } else if (result[0].status == 'Unavailable') {
  //         const data = await voucherModel.getRedeemList()
  //         res.send({ status: 'true',data, message: 'Voucher already redeemed' })
  //       }
      
  //     } else {
  //       res.send({ status: 'true', message: 'Voucher Code Not Found' })
  //     }
  //   } catch (error) {
  //     voucherResponse.error400(res, error);
  //   }
  // }
};
