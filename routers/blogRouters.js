const {Router} = require('express'),
     router = Router(),
     ModelDB = require('../models/AuthServise'),
     addTable = require('../controllers/useTable'),
     AuthServise = require('../models/AuthServise');

const authServise = new AuthServise();

const auth = async (req, res, next) => {
   try {
        const cookies = req.cookies;
        const result =  await authServise.getToken(cookies.token);
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
    const cookies = req.cookies;
    res.render('index.ejs', {title: 'MyBlog',token: cookies.token})
})

router.get('/open',auth, async (req,res) => {
    try {
        res.render('open.ejs', {title: 'OpenSite'})
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
