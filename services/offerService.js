const config = require('../connection/config')

const offerResponse =new(require("../responses/offersResponse"))

module.exports = class services {
  constructor() {}

  async addImg(req, res, result) {
    let sampleFile;
    let Path;
    if (!req.files) {
      return offerResponse.emptyFile(res);
    }
    sampleFile = result.offerImage;
    console.log(sampleFile);
    // Path = config.uploadPath + sampleFile.name;
    // sampleFile.mv(Path, (err) => {
    //   if (err) return responses.error500(res, err);
    //   return console.log("added");
    // });
  }
};
