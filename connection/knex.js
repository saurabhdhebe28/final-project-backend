const config = require('./config')

const knex = require('knex')({
    client: "mysql2",
    connection: {
        port: config.port,
        host: config.mysql2.host,
        user: config.mysql2.user,
        password: config.mysql2.password,
        database: config.mysql2.database
    }
})
knex.raw('SELECT 1').then(() => console.log('MySQL is connected')).catch((error) => console.log(error))
module.exports = knex