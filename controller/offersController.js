const validator = require("validatorjs");
const offerFormatter = new (require("../formatter/offersFormatter"))();
const offerValidation = new (require("../validation/offersValidations"))();
const offerResponse = new (require("../responses/offersResponse"))();
const offerService = new (require("../services/offerService"))();
const offerModel = new (require("../model/offerModel"))();

module.exports = class offerController {
  constructor() { }
  async addOffer(req, res) {
    try {
      console.log(req.body);
      const result = offerFormatter.addProduct(req);
      const rules = offerValidation.addOffer();
      let validation = new validator(result, rules);
      if (validation.passes()) {
        console.log("it pass");
        offerModel.add(result);  
        offerService.addImg(req, res, result);
        return offerResponse.offerAdded(res, result);
      } else {
        console.log("Offer not added and validation fails");
        res.send({ status: "false", message: "Offer not added", error: validation.errors.errors });
      }
    } catch (error) {
      console.log(error)
      offerResponse.error400(res, error);
    }
  }

  async getOffers(req, res) {             
    try {
      const result = await offerModel.getAll();
      console.log(result);
      if (result) {
        offerResponse.success(res,result);
      } else {
        res.send({ status: "false", message: "No offers in Offer Table" });
      }
    } catch (error) {
      offerResponse.error400(res, error);
    }
  }

  async purcahseList(req,res){
    try {
      const result = await offerModel.getByCode(req);
      console.log('in redem',result);
      if(result){
        if(result[0].status=='Available'){
          await offerModel.updateStatus(req);
          const data = await offerModel.getAll()
          res.send({status:'true',data,message:'redeemed succesfully'})
        }else if(result[0].status=='Unavailable'){
          res.send({status:'true',data,message:'already redeemed'})
        }
      } else {
        res.send({ status: 'true', message: 'Offer Code Not Found' })
      }
    } catch (error) {
      offerResponse.error400(res, error);
    }
  }

  async redeemList(req,res){
    try {
      const result = await offerModel.redeemList();
      res.send({status:'true',data:result,message:'redeemed datalist'})
    } catch (error) {
      offerResponse.error400(res,error)
    }

  }
};
