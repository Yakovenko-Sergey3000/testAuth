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
       return await knex('auth_session').select('token').where('token', token)
   }
}


module.exports = UserAdapterService;
