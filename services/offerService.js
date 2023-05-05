const config = require("../config");
const offerResponse = new (require("../responses/offersResponse"))();

module.exports = class services {
  constructor() {}

  async addData(req, res) {
    try {
      let data
      let res=  offerResponse.offerAdded(data)
      return res
    }
   
    catch (error) {
      console.log(error)
      res.status(500).send({ status: false, message: error.message })
    }
  }

  async addImg(req, res) {
    try {
      let sampleFile;
      let Path;
      if (!req.files) {
        return offerResponse.emptyFile(res);
      }
      sampleFile = req.files.offerImage;
      Path = config.offerUploadPath + sampleFile.name;
      sampleFile.mv(Path, (err) => {
        if (err) return responses.error500(res, err);
        return console.log("added");
      });
    } catch (error) {
      offerResponse.error400(res,error) 
    }
  }
};
