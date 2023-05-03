module.exports = class offerFormatter {
    addProduct(req) {
        return {
            offerTitle: req.body.offerTitle || req.body.title,
            offerImage: req.files.offerImage.name || req.files.image.name,
            offerCode: req.body.offerCode || req.body.code,
            merchants: req.body.Merchant || req.body.merchant,
            brands: req.body.brand || req.body.Brand,
            minAmount: req.body.minAmount || req.files.min,
            offerType: req.body.offerType || req.body.type,
            limit: req.body.limit || req.body.Limit,
            offerExpiry: req.body.offerExpiry || req.body.expiry,
            termsAndConditions: req.body.termsAndConditions || req.body.terms || req.body.conditions,
        };
    }
}

