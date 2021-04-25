const {Router} = require('express');
const modelDB = require('../models/modelDB');

const router = Router();

router.get('/', (req, res) => {
    res.render('index.ejs')
})

router.get('/reg',(req, res) => {
    res.render('reg.ejs')
})

router.post('/reg/add', async (req, res) => {
    
    try {
        await modelDB.add(res, req.body)
       
        res.redirect('/');
    } catch(e) {
        console.log(e);
        res.status(400).json(e);
    }
   
})

router.get('/log',(req, res) => {
        res.render('log.ejs' ,{title: 'login'})
})

router.post('/log',async (req, res) => {
    try {
        let token;
       await modelDB.login(req.body);
       await modelDB.createToken(1)
       .then(res => {
           token = res.rows[0].token;
       })
       res.cookie('token', token , {maxAge: Date.now() * 7})
        res.redirect('/open')

    } catch(e) {
        res.status(400).json(e)
    }
})

router.get('/logout', async (req, res) => {
    await modelDB.deleteToken(1)
    res.clearCookie('token')

    res.redirect('/log');
})



module.exports = router;