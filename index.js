const express = require("express");
const fileUpload = require("express-fileupload");
let { CheckToken } = require('./middlewares/userAuth')
const cors = require('cors')
require('dotenv').config()

const offerRoute = require("./routes/offersRouter");
const voucherRoute = require("./routes/voucherRouter");
const { orcRouter } = require("./routes/orc")
const { authRouter } = require('./routes/userAuth')

const app = express();
app.use(cors())
app.use(fileUpload());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// console.log(__dirname)
app.use('/auth', authRouter)
app.use(CheckToken)
app.use("/offers", offerRoute);
app.use("/voucher", voucherRoute);
app.use('/orc', orcRouter)

app.listen(process.env.SERVERPORT, () => {
    console.log("server is listening on port 3000");
});
