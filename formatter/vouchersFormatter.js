module.exports = class voucherFormatter {
    addNewVoucher(req) {
        return {
            voucherTitle: req.body.voucherTitle || req.body.title,
            voucherImage: req.files.voucherImage.name || req.files.image.name,
            pointRate: req.body.pointRate || req.body.point,
            merchants: req.body.merchants || req.body.merchant,
            brands: req.body.brands || req.body.Brand,
            denominationStep: req.body.denominationStep || req.body.denomStep,
            denominationStart: req.body.denominationStart || req.body.denomStart,
            denominationEnd: req.body.denominationEnd || req.body.denomEnd,
            voucherExpiryDate: req.body.voucherExpiryDate || req.body.expiry,
            voucherCode: req.body.voucherCode || req.body.code,
            termsAndConditions: req.body.termsAndConditions || req.body.terms
        };
    }
}

