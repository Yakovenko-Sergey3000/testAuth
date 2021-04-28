const express = require('express'),
    path = require('path'),
    app = express(),
    PORT = process.env.PORT || 3000,
    authRouters = require('./routers/authRourers')
    bodyParser = require('body-parser')
    client = require('./db'),
    homeRouters = require('./routers/homeRouters'),
    cookieParser = require('cookie-parser'),
    


app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname , 'public')));
app.use(bodyParser.json());
app.use(cookieParser())
app.use(express.urlencoded({extended: true}));
app.use('/', authRouters);    
app.use('/', homeRouters);    








app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));





 

