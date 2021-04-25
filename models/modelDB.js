const db = require('../db'),
    bcrypt = require('bcrypt')

class ModelDB {

    static async add(res, body) {
       const {name, pass, email} = body,
            hashPass = bcrypt.hashSync(pass, 7);
            let candidate;

           await db.query('SELECT * FROM users WHERE email=$1', [email])
            .then(res => {
                candidate = res.rows
            })
            

            return new Promise((resolve, reject) => {
                if(candidate.length) {
                    reject('Пользователь с таким email уже есть');
                   
                }
                 db.query('INSERT INTO users (login, password, email) values ($1, $2, $3)', [name, hashPass, email] )
                resolve()

            })
            
            
    }

    static async login(body) {

        const {name, password} = body;
        let candidate;
        
        await db.query('SELECT * FROM users WHERE login=$1', [name])
        .then(res => {
            candidate = res.rows[0];
        })

        
        return new Promise((resolve, reject) => {
            if(!candidate) {
                reject('Пользователь не найден')
                return;
            }

            if (!bcrypt.compareSync(password, candidate.password)) {
                reject('Неверный пароль')
                return;
            } else {
                bcrypt.compareSync(password, candidate.password);
                console.log("Вы вошли");

                resolve({
                    user: candidate.email,
                    password: candidate.password
                }); 
            }
        }) 
         
    }
    

    static async getToken(token) {
        let candidate;
        await db.query('SELECT * FROM users WHERE token=$1', [token])
            .then(res => {
                candidate = res.rows[0];
            })

        return new Promise((resolve, reject) => {
            if(!candidate) {
                reject()
            } else {
                resolve(candidate);
            }

            
        })

    }


    static async createToken(id) {
        let token = Date.now().toString();
       return db.query('UPDATE users SET token=$1 WHERE id=$2 RETURNING *', [token, id])
    }

    static async deleteToken(id) {
        
       return db.query('UPDATE users SET token=$1 WHERE id=$2 RETURNING *', [null, id])
    }

   

}


module.exports = ModelDB;