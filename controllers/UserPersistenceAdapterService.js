const knex = require('../db')

class UserAdapterService {
   async addUser(login, password, email) {
        await knex('users').insert({login,password,email})
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
}


module.exports = UserAdapterService;
