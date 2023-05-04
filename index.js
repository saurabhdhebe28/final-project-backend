const express = require("express");
const fileUpload = require("express-fileupload");
const knex = require('./connection/knex')
const cors = require('cors')
require('dotenv').config()

const offerRoute = require("./routes/offersRouter");
const voucherRoute = require("./routes/voucherRouter");

const app = express();
app.use(cors())

app.use(fileUpload());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/offer", offerRoute);
app.use("/voucher", voucherRoute);

const port = 3000 || (process.env.port)
app.listen(port, () => {
  console.log(`Express port is running on ${port}`);
});
