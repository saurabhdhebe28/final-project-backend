module.exports = class userFormatter {
    signUp(req) {
        return {
            firstName: req.body.firstName || req.body.name,
            lastName: req.files.lastName || req.files.name,
            emailId: req.body.emailId || req.body.email,
            mobileNumber: req.body.mobileNumber || req.body.Phone,
            password: req.body.password || req.body.Password
        };
    }
    login(req){
        return{
            emailId: req.body.emailId || req.body.email,
            password: req.password || req.body.Password
        }
    }
}




