let express = require('express')
const orcRouter = express.Router()
let Orc = new (require('../controller/orc'))
let { CheckToken } = require('../middlewares/userAuth')


orcRouter.post('/url', CheckToken, Orc.urlData)
orcRouter.get('/orcList', CheckToken, Orc.orcList)
orcRouter.get('/search', Orc.orcListWithSearch)


module.exports = { orcRouter }
