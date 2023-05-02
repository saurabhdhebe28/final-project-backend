module.exports = class offersValidator {
    addOffer() {
        let rules = {
            offerTitle: "required|string",
            offerImage: ["required"],
            offerCode: "required|string",
            merchants: "required",
            brands: "required",
            minAmount: "required",
            offerType: "required",
            limit: "required",
            offerExpiry: "required",
            termsAndConditions: "required|string",
        };
        return rules;
    }
};
