const config = require('../connection/config')
const voucherResponse = require('../responses/voucherResponse')

module.exports = class voucherService{
    constructor() {}

    async addImage(req,res,result){
        try{
            let image
            if(!req.files){
                return voucherResponse.emptyFile(res)
            }
            image = result.voucherImage
        }
        catch(error){
            console.log(error)
            res.status(500).send({status:false,message:error.message})
        }
    }
}
