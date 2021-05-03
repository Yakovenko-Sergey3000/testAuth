const {Router} = require('express');
const router = Router();
const ModelDB = require('../models/AuthServise');
const addTable = require('../controllers/useTable')


const auth = async (req, res, next) => {
    
    const modelDB = new ModelDB();
   try {
    const cookies = req.cookies;
    const user = await modelDB.getToken(cookies.token);
     next();
   } catch(e) {
       res.redirect('/auth/log')
   }
}

router.get('/', async (req, res) => {
    await addTable.createTables()
    const cookies = req.cookies;
    res.render('index.ejs', {title: 'MyBlog',token: cookies.token})
})

router.get('/open',auth, async (req,res) => {
    try {
        const modelDB = new ModelDB();
        const cookies = req.cookies;
        const user = await modelDB.getToken(cookies.token);
        res.render('open.ejs', {title: 'OpenSite', user:user.login})
    } catch(e) {
        console.log(e);
    }
})

router.get('/posts', async (req,res) => {
    
    try {
        const modelDB = new ModelDB();
        const cookies = req.cookies;
        const user = await modelDB.getToken(cookies.token);
        const allPosts = await modelDB.allPostsUser(user.id);
        res.render('posts.ejs', {title: 'posts', posts: allPosts.rows,user:user.login})

    } catch(e) {
        console.log(e);
    }
})

router.get('/post/add', async (req,res) => {
    try {
        const modelDB = new ModelDB();
        const cookies = req.cookies;
        const user = await modelDB.getToken(cookies.token);
    res.render('addPost.ejs', {title: 'Add post', id: user.id, user:user.login})
    } catch(e) {
        console.log(e);
    }
})

router.post('/post/add', async (req,res) => {
    try {
        const modelDB = new ModelDB();
       await modelDB.addPost(req.body)
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
