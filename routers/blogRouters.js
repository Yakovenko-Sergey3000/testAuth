const {Router} = require('express'),
     router = Router(),
     addTable = require('../controllers/useTable'),
     AuthServise = require('../models/AuthServise'),
    ModelUser = require('../models/ModelUser');


const authServise = new AuthServise();
let newUser;
const auth = async (req, res, next) => {
   try {
        const cookies = req.cookies;
        const result = await authServise.getToken(cookies.token);
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
        newUser = new ModelUser('Tim', '234', 'email');
        res.render('open.ejs', {title: 'OpenSite'})
    } catch(e) {
        console.log(e);
    }
})

router.get('/posts', auth, async (req,res) => {
    
    try {

        res.render('posts.ejs', {title: 'posts', posts:[],user:'Name'})

    } catch(e) {
        console.log(e);
    }
})

router.get('/post/add', auth, async (req,res) => {
    try {

    res.render('addPost.ejs', {title: 'Add post', id: user.id, user:user.login})
    } catch(e) {
        console.log(e);
    }
})

router.post('/post/add', async (req,res) => {
    try {

        res.redirect('/posts')
    } catch(e) {
      console.log(e);
    }
})



router.post('/post/del', async (req,res) => {
    try {
        const modelDB = new ModelDB();
        modelDB.deletePost(req.body.id)
        res.redirect('/posts')
    } catch(e) {
      console.log(e);
    }
})



module.exports = router;
