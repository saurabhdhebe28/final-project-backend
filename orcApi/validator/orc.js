module.exports = class orcRules {
    constructor() { }

    url() {
        let returnData = {
            'url': 'required|url'
        }
        return returnData
    }

    orcDataObject() {
        let returnData = {
            'requestedBy': 'required',
            'signedBy': 'required',
            'totalCounter': 'required',
            'sdcTime': 'required|date',
            'tin': 'required',
            'locationName': 'required',
            'totalAmount': 'required',
            'address': 'required',
            'city': 'required',
            'transactionTypeCounter': 'required'
        }
        return returnData
    }
}