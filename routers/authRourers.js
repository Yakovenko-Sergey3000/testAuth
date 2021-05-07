const {Router} = require('express');
const AuthService = require('../models/AuthService');


const router = Router();

const authService = new AuthService();

router.get('/auth/reg',(req, res) => {
    res.render('reg.ejs')
})

router.post('/auth/reg/add', async (req, res) => {
    try {
        const userId = await authService.createUser(req.body);
        const token = await authService.createToken(userId.toString());
        res.cookie('token', token )
        res.redirect('/open');
    } catch(e) {
        res.status(400).json(e.toString());
    }
   
})

router.get('/auth/log',(req, res) => {
        res.render('log.ejs' ,{title: 'login'})
})

router.post('/auth/log',async (req, res) => {
    try {
        const user = await authService.login(req.body)
        const token = await authService.createToken(user.id);
           res.cookie('token', token , {maxAge: Date.now() * 7})
            res.redirect('/open')
    } catch(e) {
        res.status(400).json(e.toString())
    }
})

router.get('/auth/logout', async (req, res) => {
    res.clearCookie('token')
    res.redirect('/auth/log');
})


module.exports = router;