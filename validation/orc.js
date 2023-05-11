module.exports = class orcRules {
    constructor() { }

    url() {
        let returnData = {
            'url': 'required|url'
        }
        return returnData
    }

    orcFile() {
        let returData = {
            'file': 'required',
            'htmlTemplate': 'required|string'
        }
        return returData
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
            'transactionTypeCounter': 'required',
            'location': 'required'
        }
        return returnData
    }
}