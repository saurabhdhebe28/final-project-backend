let express = require('express')
const orcRouter = express.Router()
let Orc = new (require('../controller/orc'))
let { CheckToken } = require('../middlewares/userAuth')


orcRouter.post('/url', Orc.urlData)
orcRouter.get('/orcList', Orc.orcList)
orcRouter.get('/search', Orc.orcListWithSearch)
orcRouter.post('/getHtmlTemplate', Orc.getHtmlTemplate)
orcRouter.post('/add_ocr_by_file', Orc.addorcFile)
orcRouter.get('/download_file',Orc.downLoadFile)


module.exports = { orcRouter }
