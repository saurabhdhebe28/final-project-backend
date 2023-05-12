const config = require("../config");
const voucherResponse = new (require("../responses/voucherResponse"))();
const voucherModel = new (require('../model/voucherModel'))

module.exports = class voucherService {
  constructor() { }


  async addData(req, res) {
    try {
      let data
      let res=  voucherResponse.voucherAdded(data)
      return res
    }
    catch (error) {
      res.status(500).send({ status: false, message: error.message })
    }
  }
  async addImage(req, res) {
    try {
      let sampleFile;
      let Path;
      if (!req.files) {
        return voucherResponse.emptyFile(res);
      }
      sampleFile = req.files.voucherImage;
      Path = config.voucherUploadPath + sampleFile.name;
      sampleFile.mv(Path, (err) => {
        if (err) return responses.error500(res, err);
        return console.log("image added");
      });

    }
    catch (error) {
      voucherResponse.error400(res, error)
    }
  }
};
