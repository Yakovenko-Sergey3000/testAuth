const db = require('../db'),
    bcrypt = require('bcrypt'),
    AdapterService = require('../controllers/UserPersistenceAdapterService'),
    ModelUser = require('../models/ModelUser'),
    {v4: uuid4 }= require('uuid');

const adapterService = new AdapterService()
class AuthServise {

    async createUser(body) {
       const {name, pass, email} = body,
            hashPass = bcrypt.hashSync(pass, 7),
            candidate = await adapterService.getByLogin(name);

        if(candidate.length > 0) {
            throw new Error('Такой пользователь уже есть')
        }

       try{
         return  await adapterService.addUser(name,hashPass,email)
       } catch (e) {
           return e
       }

    }


   async login(body) {
        const {name, password} = body,
             user = await adapterService.getByLogin(name);

       if(!user[0]) {
           throw new Error('Пользователь не найден')
       }

       if (!bcrypt.compareSync(password, user[0].password)) {
           throw new Error('Неверный пароль')
       }

       try {
           if(bcrypt.compareSync(password, user[0].password)) {
                return user[0];
           }
       } catch (e) {
           return e
       }

    }

     async createToken(id) {
         let newToken = uuid4();
           await adapterService.createSession(newToken, id);
        return newToken;
     }

     async getToken(token) {
       return  token ? await adapterService.getSessionByToken(token) : '';
    }


   //  async addPost(post) {
   //      const {text, url, id, title} = post;
   //
   //      db.query('INSERT INTO posts (title, text, img_url, user_id) values ($1, $2, $3, $4)', [title,text, url, id])
   //  }
   //
   //  async allPostsUser(id) {
   //     return await db.query('select * from posts where user_id=$1', [id] )
   //  }
   //
   //
   //  async deletePost(id) {
   //      return await db.query('delete from posts where id=$1', [id] )
   //  }
}



module.exports = AuthServise;