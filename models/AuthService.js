const db = require('../db'),
    bcrypt = require('bcrypt'),
    AdapterService = require('../controllers/UserPersistenceAdapterService'),
    {v4: uuid4 }= require('uuid');

const adapterService = new AdapterService()
class AuthService {

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

    async getUserIdByToken(token) {
        return await adapterService.getUserIdByToken(token)
    }

    async findOne(id) {
        return await  adapterService.getUserById(id)
    }



}



module.exports = AuthService;