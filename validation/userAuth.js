module.exports = class authRules {
    constructor() { }
    signUp() {
        let returnData = {
            'firstName': 'required|string|min:2|max:20',
            'lastName': 'required|string|min:2|max:20',
            'emailId': 'required|string|email|min:5|max:30',
            'mobileNumber': 'required|string|max:10|min:10',
            'password': 'required|string|min:3|max:12'
        }
        return returnData
    }

    login() {
        let returnData = {
            'emailId': 'required|string|email|min:5|max:30',
            'password': 'required|string|min:3|max:12'
        }
        return returnData
    }
}






