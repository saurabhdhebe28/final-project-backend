module.exports = class offerResponse {
    constructor() {}
    success(res, data) {
      return res.status(200).json({ success: true, data: data });
    }
    emptyFile(res) {
      return res.status(400).json({ success: false, message: "No Cover Image were Uploaded" });
    }
    error500(res, err) {
      return res.status(500).json({ success: false, message: err.message });
    }
    error400(res, error) {
      return res.status(400).json({ success: false, message: error.message });
    }
    offerAdded(res, imageData) {
      res.status(200).json({ success: true, imageData: imageData, message: "data added" });
    }
  
    notFound(res) {
      return res.status(404).json({ success: false, message: "id not found" });
    }
}