const Pool = require('pg').Pool;


const pool= new Pool({
    host: 'localhost',
    user: '***',
    password: '',
    database: 'auth',
    port: 5432
});



module.exports = pool;