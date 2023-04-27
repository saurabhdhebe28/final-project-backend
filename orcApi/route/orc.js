let express = require('express')
const router = express.Router()
let Orc = new (require('../controller/orc'))


router.post('/api/url', Orc.urlData)
router.get('/api/orcList', Orc.orcList)


module.exports = { router }