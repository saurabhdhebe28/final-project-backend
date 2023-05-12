const express = require("express");
const fileUpload = require("express-fileupload");
let { CheckToken } = require("./middlewares/userAuth");
const cors = require("cors");
const winston = require("winston");
require("dotenv").config();
const offerRoute = require("./routes/offersRouter");
const voucherRoute = require("./routes/voucherRouter");
const { orcRouter } = require("./routes/orc");
const { authRouter } = require("./routes/userAuth");

const app = express();

const logger = winston.createLogger({
  transports: [new winston.transports.File({ filename: "app.log" })],
});
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.originalUrl} ${res.statusCode}`);
  next();
});

const errorLogger = winston.createLogger({
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }),
  ],
});

app.use((err, req, res, next) => {
  errorLogger.error(err.message);
  next(err);
});

app.use(cors());
app.use(fileUpload());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/auth', authRouter)
app.use(CheckToken)
app.use("/offers", offerRoute);
app.use("/voucher", voucherRoute);
app.use("/orc", orcRouter);

app.listen(process.env.SERVERPORT, () => {
  console.log("server is listening on port 3000");
});
