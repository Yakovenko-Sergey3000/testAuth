const {Router} = require('express');
const router = Router();
const modelDB = require('../models/modelDB');


const auth = async (req, res, next) => {
    

   try {
    const cookies = req.cookies;
     await modelDB.getToken(cookies.token);
     next();

   } catch(e) {
       res.redirect('/log')
   }
    
    
}

router.get('/open',auth, (req,res) => {
    res.render('open.ejs', {title: 'OpenSite'})
})




module.exports = router;
