const validator = require("validatorjs");
const offerFormatter = new (require('../formatter/offersFormatter'))
const offerValidation = new (require('../validation/offersValidations'))
const offerResponse = new (require('../responses/offersResponse'))
const offerService = new (require('../services/offerService'))

module.exports = class offerController {
  constructor() {}
  async addOffer(req, res) {
    try {
      const result = offerFormatter.addProduct(req);
      console.log(result);
      console.log('good morning')
      const rules = offerValidation.addOffer();
      let validation = new validator(result, rules);
      if (validation.passes()) {
        console.log("it pass");
        offerService.addImg(req, res, result);
        return offerResponse.added(res, result);
      } else if (validation.fails()) {
        console.log("it falis");
      } else {
        res.send({
          status: "false",
          message: "product not added",
          error: validation.errors.errors,
        });
      }
    } catch (error) {
      responses.error400(res, error);
    }
  }
};