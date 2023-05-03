const express = require("express")
const app = express()
const cors = require('cors')
const fileUpload = require("express-fileupload");

require('dotenv').config()
const { orcRouter } = require('../orcApi/routes/orc')
const { authRouter } = require("./routes/userAuth")
const offerRoute = require("./routes/offersRouter");
const voucherRoute = require("./routes/voucherRouter");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors())


app.use('/orc', orcRouter)
app.use('/auth', authRouter)
app.use("/offers", offerRoute);
app.use("/voucher", voucherRoute);





app.listen(process.env.SERVERPORT, (err) => {
    if (err) {
        console.log("Connection Failed for server", err)
    }
    else {
        console.log(`Connected to Server on port:${process.env.SERVERPORT}`)
    }
})