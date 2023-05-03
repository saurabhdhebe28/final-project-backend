module.exports = class voucherResponse {
    constructor() {}
    success(res, data) {
      return res.status(200).send({ success: true, Data: data });
    }
    emptyFile(res) {
      return res.status(400).send({ success: false, message: "No Image Uploaded" });
    }
    error500(res, err) {
      return res.status(500).json({ success: false, message: err.message });
    }
    error400(res, error) {
      return res.status(400).json({ success: false, message: error.message });
    }
    voucherAdded(res, data) {
      res.status(200).json({ success: true, data: data, message: "Data added" });
    }
    notFound(res) {
      return res.status(404).json({ success: false, message: "id not found" });
    }
}