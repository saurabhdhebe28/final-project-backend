require('dotenv').config()
const config = {
    port: 3306,
    mysql: {
        "host": process.env.DBHOST,
        "user": process.env.DBUSER,
        "password": process.env.DBPASSWORD,
        "database": process.env.DBNAME
    }
}
module.exports = config