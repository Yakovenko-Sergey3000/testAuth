const Pool = require('pg').Pool;


const pool= new Pool({
    host: 'localhost',
    user: 'hillsong3000',
    password: '1234',
    database: 'blog',
    port: 5432
});



module.exports = pool;
