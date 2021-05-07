const knex = require('../db')

class UserAdapterService {
   async addUser(login, password, email) {
       return  await knex('users').insert({login,password,email}).returning('id')
    }

    async getByLogin(login) {
       return await knex('users').select('*').where('login',login)
    }


   async createSession(token, userId) {
        await knex('auth_session').insert({token, user_id:userId});
   }

   async getSessionByToken(token) {
       return await knex('auth_session').select('token').where('token', token);
   }

   async getUserIdByToken(token) {
        return await knex('auth_session').select('user_id').where('token', token);
   }

   async getUserById(id) {
       return await  knex('users').select('*').where('id', id);
   }

   async addPost(id, title, text, url) {
       await knex('posts').insert({
           title,
           text,
           img_url:url,
           user_id:id
       })
   }

   async getAllPostsUser(id) {
       return await knex('posts').select('*').where('user_id', id)
   }

   async deletePost(id) {
       await knex('posts').del().where('id', id);
   }
}


module.exports = UserAdapterService;
