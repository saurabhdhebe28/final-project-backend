let express = require('express')
const orcRouter = express.Router()
let Orc = new (require('../controller/orc'))


orcRouter.post('/url', Orc.urlData)
orcRouter.get('/orcList', Orc.orcList)
orcRouter.get('/search', Orc.orcListWithSearch)
orcRouter.post('/add_ocr_by_file', Orc.addorcFile)
orcRouter.get('/download_file',Orc.downLoadFile)
orcRouter.get('/get_header',Orc.getHeader)


module.exports = { orcRouter }
