const express = require("express")
const app = express()
const cors = require('cors')
require('dotenv').config()
const { orcRouter } = require('../orcApi/routes/orc')
const { authRouter } = require("./routes/userAuth")
app.use(express.json())
app.use(cors())

app.use('/orc', orcRouter)

app.use('/auth', authRouter)





app.listen(process.env.SERVERPORT, (err) => {
    if (err) {
        console.log("Connection Failed for server", err)
    }
    else {
        console.log(`Connected to Server on port:${process.env.SERVERPORT}`)
    }
})