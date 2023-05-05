module.exports = class offerResponse {
    constructor() {}
    success(res, data) {
      return res.status(200).json({ status: true, data });
    }
    emptyFile(res) {
      return res.status(400).json({ status: false, message: "No Cover Image were Uploaded" });
    }
    error500(res, err) {
      return res.status(500).json({ status: false, message: err.message });
    }
    error400(res, error) {
      return res.status(400).json({ status: false, message: error.message });
    }
    offerAdded(res, data) {
      res.status(200).json({ status: true, data: data, message: "data added" });
    }
  
    notFound(res) {
      return res.status(404).json({ status: false, message: "id not found" });
    }
}