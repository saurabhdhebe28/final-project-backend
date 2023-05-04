const express = require("express");
const fileUpload = require("express-fileupload");
const knex = require('./connection/knex')
const cors = require('cors')
require('dotenv').config()

const offerRoute = require("./rotues/offersRouter");
const voucherRoute = require("./rotues/voucherRouter");
const app = express();
app.use(cors())

app.use(fileUpload());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/offers", offerRoute);
app.use("/voucher", voucherRoute);

const port = 3000;
app.listen(port, () => {
  console.log("server is listening on port 3000");
});
