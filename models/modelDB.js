const db = require('../db'),
    bcrypt = require('bcrypt')

class ModelDB {

     async add(body) {
       const {name, pass, email} = body,
            hashPass = bcrypt.hashSync(pass, 7);
            
            let result = await db.query('SELECT * FROM users WHERE login=$1', [name])
            let candidate = result.rows;

            return new Promise((resolve, reject) => {
                if(candidate.length) {
                    reject('Пользователь с таким Логином уже есть');
                   
                } else {
                    db.query('INSERT INTO users (login, password, email) values ($1, $2, $3)', [name, hashPass, email] )
                resolve()
                }
                

            })
            
            
    }

   async login(body) {

        const {name, password} = body;
        
        
      const result =  await db.query('SELECT * FROM users WHERE login=$1', [name])
      let candidate = result.rows[0];
        

        
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

                resolve(candidate); 
            }
        }) 
         
    }
    

     async getToken(token) {
       
        let candidate = await (await db.query('SELECT * FROM users WHERE token=$1', [token])).rows[0];
            

        return new Promise((resolve, reject) => {
            if(!candidate) {
                reject()
            } else {
                resolve();
            }

            
        })

    }


    async createToken(id) {
        let token = Date.now().toString();
       return db.query('UPDATE users SET token=$1 WHERE id=$2 RETURNING *', [token, id])
    }

    async logout(token) {
        console.log("Вы вышли");
       return db.query('UPDATE users SET token=$1 WHERE token=$2 RETURNING *', [null, token])
    }

   

}


module.exports = ModelDB;