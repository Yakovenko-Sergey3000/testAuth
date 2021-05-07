const {Router} = require('express'),
     router = Router(),
     addTable = require('../controllers/useTable'),
     AuthService = require('../models/AuthService'),
    PostService = require('../models/PostService'),
    multer = require('multer');

  const config = multer.diskStorage({

        destination: function (req, res, cb)  {
            cb(null, './public/img/posts');
        },
      filename: function (req, file, cb) {
          cb(null, file.originalname.split('.')[0] + '-' + Date.now() + '.' + file.originalname.split('.')[1])
      },



    });

const upload = multer({
    storage: config
}).single('url');


const authService = new AuthService();
const postService = new PostService()

const findUser = async (token) =>  {
   const resultId = await authService.getUserIdByToken(token),
         userId = resultId[0]['user_id'],
         resultUser = await authService.findOne(userId);

    return resultUser[0]

}
const auth = async (req, res, next) => {
   try {
        const cookies = req.cookies;
        const result = await authService.getToken(cookies.token);
       if (!result) {
           throw new Error();
       }
         next();
   } catch(e) {
        res.redirect('/auth/log')
   }
}

router.get('/', async (req, res) => {
    await addTable.createTables()

    res.render('index.ejs', {title: 'MyBlog'})
})

router.get('/open',auth, async (req,res) => {
    try {

        res.render('open.ejs', {title: 'OpenSite'})
    } catch(e) {
        console.log(e);
    }
})

router.get('/posts', auth, async (req,res) => {
    const cookies = req.cookies,
          user = await findUser(cookies.token),
        userPosts = await postService.getAllPostsUser(user.id)
    console.log(userPosts)
    try {
        res.render('posts.ejs', {title: 'posts', posts:userPosts})
    } catch(e) {
        console.log(e);
    }
})

router.get('/post/add', auth, async (req,res) => {
    const cookies = req.cookies;
    const user = await findUser(cookies.token);

    try {
    res.render('addPost.ejs', {title: 'Add post', id: user.id});
    } catch(e) {
        console.log(e);
    }
})

router.post('/post/add', upload, async (req,res) => {
    console.log(req.file)
    await postService.addPost(req.body,req.file.path);


    try {
        res.redirect('/posts')
    } catch(e) {
      console.log(e);
    }
})



router.post('/post/del', async (req,res) => {
    await postService.deletePost(req.body.id)
    try {
        res.redirect('/posts')
    } catch(e) {
      console.log(e);
    }
})



module.exports = router;
