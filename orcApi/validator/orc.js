module.exports = class orcRules {
    constructor() { }

    url() {
        let returnData = {
            'url': 'required|url'
        }
        return returnData
    }
}