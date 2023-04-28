const express = require("express")
const app = express()
const cors = require('cors')
require('dotenv').config()
const { router } = require('../orcApi/route/orc')
app.use(express.json())
app.use(cors())
app.use('/', router)





app.listen(process.env.SERVERPORT, (err) => {
    if (err) {
        console.log("Connection Failed for server", err)
    }
    else {
        console.log(`Connected to Server on port:${process.env.SERVERPORT}`)
    }
})