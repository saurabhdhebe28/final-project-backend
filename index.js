const express = require("express");
const fileUpload = require("express-fileupload");
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
app.use("/offers", offerRoute);
app.use("/voucher", voucherRoute);

app.use('/orc', orcRouter)
app.use('/auth', authRouter)
app.listen(process.env.SERVERPORT, () => {
    console.log("server is listening on port 3000");
});
