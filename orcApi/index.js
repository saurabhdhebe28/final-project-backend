const express = require("express")
const app = express()
require('dotenv').config()
const { router } = require('../orcApi/route/orc')
app.use(express.json())
app.use('/', router)
let port = 3001




app.listen(process.env.SERVERPORT, (err) => {
    if (err) {
        console.log("Connection Failed for server", err)
    }
    else {
        console.log(`Connected to Server on port:${process.env.SERVERPORT}`)
    }
})