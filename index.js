const express=require('express');
const session=require('express-session');

const app=express();
const PORT=3001;

app.set('view engine','ejs');
app.use(express.static(__dirname+'/public'));
app.use(express.urlencoded({extended:true}));
app.use(session({
    secret: 'hehehehe',
    resave: false,
    saveUninitialized: true
}));

app.get('/',(req,res)=>{
    res.send('Ini halaman landing page untuk Pair Project');
});

app.listen(PORT,()=>{
    console.log('Server listent on '+PORT);
})


