module.exports = class voucherResponse {
  constructor() { }
  success(res, data) {
    return res.status(200).send({ status: true, data: data });
  }
  emptyFile(res) {
    return res.status(400).send({ status: false, message: "No Image Uploaded" });
  }
  error500(res, err) {
    return res.status(500).json({ status: false, message: err.message });
  }
  error400(res, error) {
    return res.status(400).json({ status: false, message: error.message });
  }
  voucherAdded(res, data) {
    res.status(200).json({ status: true, data: data, message: "Data added" });
  }
  notFound(res) {
    return res.status(404).json({ status: false, message: "id not found" });
  }
}