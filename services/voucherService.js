const config = require("../config");
const voucherResponse = new(require("../responses/voucherResponse"))();

module.exports = class voucherService {
  constructor() {}

  async addImage(req, res) {
    try {
        let sampleFile;
        let Path;
        if (!req.files) {
          return offerResponse.emptyFile(res);
        }
        sampleFile = req.files.voucherImage;
        Path = config.voucherUploadPath + sampleFile.name;
        sampleFile.mv(Path, (err) => {
          if (err) return responses.error500(res, err);
          return console.log("added");
        });
    } catch (error) {
      voucherResponse.error400(res,error)
    }
  }
};
