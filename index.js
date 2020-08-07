var express = require('express');
var app = express();

app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

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
    res.send([
  {
  _id: "5f2d09775b88bc3038f75ba2",
  name: "Ayush",
  number: "981991",
  qualification: "adsf",
  institute: "Uttar Pradesh Technical University",
  __v: 0
  },
  {
  _id: "5f2d09855b88bc3038f75ba3",
  name: "Silicon Hills",
  number: "981991",
  qualification: "adsf",
  institute: "sdfd",
  __v: 0
  }
])
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
