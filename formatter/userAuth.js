module.exports = class authFormatter {
  constructor() {}
  signUp(param) {
    let data = {};
    (data["firstName"] = param.firstName),
      (data["lastName"] = param.lastName),
      (data["emailId"] = param.emailId),
      (data["mobileNumber"] = param.mobileNumber),
      (data["password"] = param.password);
    return data;
  }
  login(param) {
    let data = {};
    (data["emailId"] = param.emailId), (data["password"] = param.password);
    return data;
  }
};
