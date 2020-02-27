const express=require('express');
const session=require('express-session');
const fs=require('fs');

const app=express();
const PORT=process.env.PORT||3000;

app.set('view engine','ejs');
app.use(express.static(__dirname+'/public'));
app.use(express.urlencoded({extended:true}));
app.use(session({
    secret: 'hehehehe',
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use('/',require('./router/routerindex'));
app.use('/user',require('./router/routerUser'));
app.use('/course',require('./router/routerCourses'));

app.listen(PORT,()=>{
    console.log('Server listening on '+PORT);
})


