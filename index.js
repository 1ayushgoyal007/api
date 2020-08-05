var express = require('express');
var app = express();

app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));

app.get('/', function(req,res){
    res.render('index');
})

app.get('/quiz', function(req,res){
    res.render('quiz');
});

app.post('/quiz', function(req,res){
    res.send('data pushed');
})

app.get('/allQuiz', function(req,res){
    res.send({
        a:'temp1',
        b:'some data'
    })
})

app.get('/faceoff', function(req,res){
    res.render('faceoff');
})

app.get('/professor', function(req,res){
    res.render('professor');
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