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
      const result = await offerFormatter.addProduct(req);
      const rules = await offerValidation.addOffer();
      let validation = new validator(result, rules);
      if (validation.passes()) {
        await offerModel.add(result);
        await offerService.addImg(req, res, result);
        return offerResponse.offerAdded(res, result);
      } else {
        res.send({
          status: "false",
          message: "Offer not added",
          error: validation.errors.errors,
        });
      }
    } catch (error) {
      return offerResponse.error400(res, error);
    }
  }

  async getOffers(req, res) {
    try {
      const result = await offerModel.getAll();
      if (result) {
       return offerResponse.success(res, result);
      } else {
       return res.send({
          status: "false",
          message: "No Data in Offers Table",
        });
      }
    } catch (error) {
      return offerResponse.error400(res, error);
    }
  }

  async assign(req, res) {
    try {
      const userInfo = await offerModel.checkUser(req);
      const offerInfo = await offerModel.checkOffer(req);
      if (userInfo && offerInfo) {
        await offerModel.assign(req);
        return res.status(200).json({ status: true, message: 'Data added succesfully in Assigned table' })
      } else {
        return res.status(404).json({ status: true, message: 'Invalid id for user or offer' })
      }
    } catch (error) {
      return offerResponse.error400(res, error)
    }
  }

  async getAssign(req, res) {
    try {
      const data = await offerModel.getAssigned()
      if (data) {
       return res.status(200).json({ status: true, data, message: 'Fetched assigned offer succesfully' });
      } else {
       return res.status(404).json({ status: 'false', message: 'Data set is empty' })
      }
    } catch (error) {
      return offerResponse.error400(res, error)
    }
  }

  async redeemOffer(req, res) {
    try {
      const result = await offerModel.getById(req);
      if (result) {
        if (result[0].status == 'Available') {
          await offerModel.updateStatus(req);
          const data = await offerModel.getAssigned()
          res.send({ status: 'true', data, message: ' Offer redeemed succesfully' })
        } else if (result[0].status == 'Unavailable') {
          res.send({ status: 'true', data, message: 'Already redeemed' })
        }
      } else {
        res.send({ status: 'true', message: 'Offer Code Not Found' })
      }
    } catch (error) {
      return offerResponse.error400(res, error);
    }
  }


  async redeemList(req, res) {
    try {
      const result = await offerModel.redeemList();
      if (result) {
        res.send({ status: 'true', data: result, message: 'Redeemed datalist' })
      } else {
        res.status(404).json({ status: 'false', message: 'Data set is empty' })
      }
    } catch (error) {
      return offerResponse.error400(res, error)
    }
  }
};