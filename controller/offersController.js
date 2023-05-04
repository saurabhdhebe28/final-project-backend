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
        console.log("Offer added and validation passes");
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
      let data = await offerModel.getpurchase()
      if(data){
        offerResponse.success(res,data)
      }
      else{
        res.send({status:'false',message:'No purchase has made'})
      }
    } catch (error) {
      
    }
  }

  async redeemOffer(req, res) {
    try {
      const result = await offerModel.getByCode(req);
      if (result) {
        if (result.status == 'available') {
          await offerModel.updateStatus(req);
          const data = await offerModel.getByStatus()
          res.send({ status: 'true', data, message: 'Offer redeemed succesfully' })
        } else if (result.status == 'unavailable') {
          res.send({ status: 'true', data, message: 'Offer already redeemed' })
        }
      } else {
        res.send({ status: 'true', message: 'Offer Code Not Found' })
      }
    } catch (error) {
      offerResponse.error400(res, error);
    }
  }
};
