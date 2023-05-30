const cheerio = require("cheerio");
let orcRules = new (require("../validation/orc"))();
const validatorjs = require("validatorjs");
let orcModel = new (require("../model/orc"))();
let offerModel = new (require("../model/offerModel"))();
let voucherModel = new (require("../model/voucherModel"))();
let moment = require("moment");
const config = require("../config");
const axios = require("axios");

module.exports = class Orc {
  constructor() {}
  async getHeaders(param) {
    let response;
    try {
      response = await axios.get(param.query.url);
    } catch (error) {
      return {
        data: {
          status: false,
          data: error,
        },
      };
    }
    //hkshfwklrhflwhvliwrhvliw
    return {
      data: {
        status: true,
        data: response.headers,
      },
    };
  }
  async addOcrByfile(param, userData) {
    if (!param.file || !param.htmlTemplate || typeof param.file != "object") {
      return {
        data: {
          status: false,
          data: "Required Data Not Found Please try with Accurate File",
        },
      };
    }
    let fileInfo = param.file;
    let fileName = fileInfo.name;
    let htmlContent = param.htmlTemplate;
    let uploadPath = config.ocrUploadPath + fileName;
    let a = uploadPath.split("/");
    let b = a.reverse();
    let dbPath = "/" + b[2] + "/" + b[1] + "/" + b[0];

    let $ = cheerio.load(htmlContent);
    let urlData = {
      requestedBy: $("#requestedByLabel").text().trim(),
      signedBy: $("#signedByLabel").text().trim(),
      totalCounter: $("#totalCounterLabel").text().trim(),
      // sdcTime: $('#sdcDateTimeLabel').text().trim(),
      // sdcTime: await STR_TO_DATE($('#sdcDateTimeLabel').text().trim(), '%d.%m.%Y. %H:%i:%s'),
      sdcTime: await moment(
        $("#sdcDateTimeLabel").text().trim(),
        "DD.MM.YYYY. HH:mm:ss"
      ).format("YYYY-MM-DD HH:mm:ss"),
      tin: $("#tinLabel").text().trim(),
      locationName: $("#shopFullNameLabel").text().trim(),
      totalAmount: $("#totalAmountLabel").text().trim(),
      address: $("#addressLabel").text().trim(),
      city: $("#cityLabel").text().trim(),
      transactionTypeCounter: $("#transactionTypeCounterLabel").text().trim(),
      location: dbPath,
      user_id: userData.id,
    };

    try {
      let rules = orcRules.orcDataObject();
      let validate = new validatorjs(urlData, rules);
      if (validate.fails()) {
        return {
          data: {
            status: false,
            data: "This input doesnt contain the expected value please enter proper url",
          },
        };
      }
    } catch (error) {
      return {
        data: {
          status: false,
          data: error,
        },
      };
    }

    let addData = await orcModel.addUrlData(urlData).catch((err) => {
      return { error: err };
    });
    if (!addData || addData.error) {
      return {
        data: {
          status: false,
          data: addData.error.sqlMessage,
        },
      };
    }
    try {
      fileInfo.mv(uploadPath);
    } catch (error) {
      return {
        data: {
          status: false,
          data: error,
        },
      };
    }
    return {
      data: {
        status: true,
        data: "Data inserted",
      },
    };
  }
  async addUrl(url, userData) {
    let htmlSyntax;
    let value;
    try {
      htmlSyntax = await axios.get(url);
      value = await htmlSyntax.data;
    } catch (error) {
      return {
        data: {
          status: false,
          data: error.message,
        },
      };
    }

    let $ = cheerio.load(value);
    let urlData = {
      requestedBy: $("#requestedByLabel").text().trim(),
      signedBy: $("#signedByLabel").text().trim(),
      totalCounter: $("#totalCounterLabel").text().trim(),
      // sdcTime: $('#sdcDateTimeLabel').text().trim(),
      // sdcTime: await STR_TO_DATE($('#sdcDateTimeLabel').text().trim(), '%d.%m.%Y. %H:%i:%s'),
      sdcTime: await moment(
        $("#sdcDateTimeLabel").text().trim(),
        "DD.MM.YYYY. HH:mm:ss"
      ).format("YYYY-MM-DD HH:mm:ss"),
      tin: $("#tinLabel").text().trim(),
      locationName: $("#shopFullNameLabel").text().trim(),
      totalAmount: $("#totalAmountLabel").text().trim(),
      address: $("#addressLabel").text().trim(),
      city: $("#cityLabel").text().trim(),
      transactionTypeCounter: $("#transactionTypeCounterLabel").text().trim(),
      location: url,
      user_id: userData.id,
    };

    let rules = await orcRules.orcDataObject();
    let validate = await new validatorjs(urlData, rules);
    if (validate.fails()) {
      return {
        data: {
          status: false,
          data: "This url doesnt contain the expected value please enter proper url",
        },
      };
    }
    let addData = await orcModel.addUrlData(urlData).catch((err) => {
      return { error: err };
    });
    if (!addData || addData.error) {
      return {
        data: {
          status: false,
          data: addData.error.sqlMessage,
        },
      };
    }
    return {
      data: {
        status: true,
        data: "Data inserted",
      },
    };
  }

  async orcList(userData) {
    let folderPath = config.ocrUploadPath;
    let data;
    try {
      data = await orcModel.orcDataList(userData.id);
    } catch (error) {
      return {
        data: {
          status: false,
          data: error.message,
        },
      };
    }
    if (data.length == 0) {
      return {
        data: {
          status: false,
          data: "Not Found",
        },
      };
    }
    for (let a in data) {
      data[a].isUrl = true;
      let check = data[a].location.split("/");
      if (check[0] == "") {
        data[a].location = folderPath + data[a].location;
        data[a].isUrl = false;
      }
    }
    return {
      data: {
        status: true,
        data: data,
      },
    };
  }

  async orcListWithSerach(param, userData) {
    let requestedBy = param.requestedBy ? param.requestedBy : "";
    let tin = param.tin ? param.tin : "";
    let city = param.city ? param.city : "";

    let search = await orcModel
      .OcrListBysearch(requestedBy, tin, city, userData.id)
      .catch((err) => {
        return { error: err };
      });
    if (!search || search.error) {
      return {
        data: {
          status: false,
          data: search.error.sqlMessage,
        },
      };
    }
    return {
      data: {
        status: true,
        data: search,
      },
    };
  }
};
