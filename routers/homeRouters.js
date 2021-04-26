const {Router} = require('express');
const router = Router();
const ModelDB = require('../models/modelDB');


const auth = async (req, res, next) => {
    
    const modelDB = new ModelDB();
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
