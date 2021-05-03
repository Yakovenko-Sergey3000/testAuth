const knex = require('knex')({
    client: 'pg',
    connection: {
        host: 'localhost',
        user: 'hillsong3000',
        password: '1234',
        database: 'blog',
        port: 5432
    }
})


module.exports = knex;


