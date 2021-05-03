const knex = require('../db')

class UserAdapterService {
   async addUser(login, password, email) {
       return  await knex('users').insert({login,password,email}).returning('id')
    }

    async getByLogin(login) {
       return await knex('users').select('*').where('login',login)
    }

   async getAll() {
       return await knex('users').select('*')
   }

   async createSession(token, userId) {
        await knex('auth_session').insert({token, user_id:userId});
   }

   async getByToken(token) {
       return await knex('auth_session').select('token').where('token', token)
   }
}


module.exports = UserAdapterService;
