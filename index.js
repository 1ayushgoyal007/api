var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
var methodOverride = require("method-override");



app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});



mongoose.connect('mongodb://localhost/professor',{useNewUrlParser:true, useUnifiedTopology:true}).then(()=>{
    console.log('DB Connected');
}).catch((err)=>{
    console.log('DB Having issues', err.message);
})




var Professor = require('./models/User');



app.get('/', function(req,res){
    res.render('index');
})

app.get('/professor', function(req,res){
    res.render('professor');
})

app.get('/viewProfessors', function(req,res){
    Professor.find({},function(err, data){
        if(err){
            console.log('error occured',err);
        }else{
            res.render('viewProfessor', {data:data});
        }
    })
})

app.post('/professor', function(req,res){
    var name = req.body.name;
    var number = req.body.number;
    var qualification = req.body.qualification;
    var institute = req.body.institute;

    var newProfessor = {
        name:name,
        number:number,
        qualification:qualification,
        institute:institute
    }
    Professor.create(newProfessor, function(err, newlyData){
        if(err){
            console.log('error',err);
        }else{
            console.log('Data Pushed', newlyData);
            res.redirect('/professor')
        }
    })
})

app.delete('/viewProfessors/:id', function(req,res){
    console.log('here are your id',req.params.id);
    Professor.findByIdAndRemove(req.params.id,function(err){
        if(err){
            console.log('error',err);
            res.send('error');
        }else{
            console.log('deleting successful');
            res.redirect('/viewProfessors');
        }
    })})


app.get('/allProfessor', function(req,res){
    Professor.find({}, function(err,data ){
        if(err){
            console.log('error occured', err);
        }else{
            console.log('here is your data',data);
            res.send(data);
        }
    })
})

app.get('/quiz', function(req,res){
    res.render('quiz');
});

app.post('/quiz', function(req,res){
    res.send('data pushed');
})

app.get('/faceoff', function(req,res){
    res.render('faceoff');
})

app.get('/stories', function(req,res){
    res.render('stories');
})

app.get('*', function(req,res){
    res.render('default');
})

app.set("port", process.env.PORT || 4000);
app.listen(app.get("port"), function(req,res){
      console.log("Application running in port: " + app.get("port"));
});