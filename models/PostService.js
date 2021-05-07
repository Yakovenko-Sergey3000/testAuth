const AdapterService = require('../controllers/UserPersistenceAdapterService');

const adapterService = new AdapterService();
class User {


     async addPost(post, url) {
         const {id, text, title} = post,
            shotUrl = url.split('/').slice(1).join('/');

              await adapterService.addPost(id, title, text, shotUrl);
     }

     async getAllPostsUser(id) {
        return await adapterService.getAllPostsUser(id)
     }


     async deletePost(id) {
        await adapterService.deletePost(id);
     }



}


module.exports = User