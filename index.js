var express = require('express');
var bodyParser = require('body-parser');
const mysql = require('mysql')
var app = express();
const path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
// const { Pool } = require('pool')
// require('dotenv').config()


app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.set('view engine', 'ejs');

app.use(cookieParser());
app.use(session({secret: "Shh, its a secret!",saveUninitialized:true, resave: false}));
app.use(express.static(path.join(__dirname, '/public')));


//from line 25 - 35 mysql database
const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'sketch2'
});

db.connect((err)=>{
    if(err) throw err
    console.log("Connected to db")
})

app.get("/",(req,res)=>{
    res.render("index")
});

app.all("/signin",(req,res)=>{
        res.render("login")
    });

app.all("/signup",(req,res)=>{

    if (req.method == "POST"){
        var params = req.body;
        params.role = "guest";
        db.query("INSERT INTO sketchtrial SET ?" ,params, (err,result)=>{
            
        })

    }else{
        res.render("signup")
    }
    });

    app.all("/itemsforsale",(req,res)=>{
        res.render("itemsforsale")
    });

    app.all("/contactinfo",(req,res)=>{
        res.render("contactinfo")
    });

    app.all("/techstack",(req,res)=>{
        res.render("techstack")
    });

app.listen(process.env.PORT||3000);
console.log("app is running")