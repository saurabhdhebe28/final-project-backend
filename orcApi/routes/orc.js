let express = require('express')
const orcRouter = express.Router()
let Orc = new (require('../controller/orc'))
let { CheckToken } = require('../middlewares/userAuth')


orcRouter.post('/url', Orc.urlData)
orcRouter.get('/orcList', Orc.orcList)
orcRouter.get('/search', Orc.orcListWithSearch)


module.exports = { orcRouter }
