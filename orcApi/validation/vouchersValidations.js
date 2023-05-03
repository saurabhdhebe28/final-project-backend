module.exports = class offersValidator {
    addVoucher() {
        let addVouchers = {
            voucherTitle: "required|string",
            voucherImage: ["required"],
            pointRate: "required|numeric",
            merchants: "required",
            brands: "required",
            denominationStep: "required",
            denominationStart: 'required',
            denominationEnd: 'required',
            voucherExpiryDate: 'required',
            voucherCode: 'required',
            termsAndConditions: 'required',
        };
        return addVouchers;
    }
};
