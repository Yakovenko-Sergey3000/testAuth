const {Router} = require('express');
const ModelDB = require('../models/ModelDB');



const router = Router();

router.get('/', (req, res) => {
    const cookies = req.cookies;
    res.render('index.ejs', {title: 'MyBlog',token: cookies.token})
})

router.get('/auth/reg',(req, res) => {
    res.render('reg.ejs')
})

router.post('/reg/add', async (req, res) => {
    const modelDB = new ModelDB();

    try {
        await modelDB.add(req.body)
       
        res.redirect('/');
    } catch(e) {
        console.log(e);
        res.status(400).json(e);
    }
   
})

router.get('/auth/log',(req, res) => {
        res.render('log.ejs' ,{title: 'login'})
})

router.post('/auth/log',async (req, res) => {
    try {
    const modelDB = new ModelDB();
    const user = await modelDB.login(req.body);
    const token = await (await modelDB.createToken(user.id)).rows[0].token;
       res.cookie('token', token , {maxAge: Date.now() * 7})
        res.redirect('/open')

    } catch(e) {
        
        res.status(400).json(e)
    }
})

router.get('/logout', async (req, res) => {
    
    const modelDB = new ModelDB();
    await modelDB.logout(req.cookies.token)
    
    res.clearCookie('token')

    res.redirect('/auth/log');
})



module.exports = router;