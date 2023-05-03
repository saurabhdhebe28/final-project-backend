require("dotenv").config()
const knex = require('knex')({
    client: 'mysql2',
    connection: {
        host: process.env.DBHOST,
        port: process.env.DBPORT,
        user: process.env.DBUSER,
        password: process.env.DBPASSWORD,
        database: process.env.DBNAME
    }
});

knex.raw('SELECT 1').then(() => {
    console.log("Databse is connected")
}).catch((err) => {
    console.log("Database is not connected", err)
});

module.exports = { knex }