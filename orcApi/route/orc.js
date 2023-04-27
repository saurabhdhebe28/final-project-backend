let express = require('express')
const router = express.Router()
let Orc = new (require('../controller/orc'))


router.post('/api/url', Orc.urlData)


module.exports = { router }