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



mongoose.connect('mongodb+srv://Company:Company@cluster0.l2p3v.mongodb.net/Cluster0?retryWrites=true&w=majority',{useNewUrlParser:true, useUnifiedTopology:true}).then(()=>{
    console.log('DB Connected');
}).catch((err)=>{
    console.log('DB Having issues', err.message);
})

// mongoose.connect('mongodb://localhost/mainQuiz',{useNewUrlParser:true, useUnifiedTopology:true}).then(()=>{
//     console.log('Connected Local DB');
// })



var Professor = require('./models/User');
var Matrimony = require('./models/Matrimony');
var Question = require('./models/Question');
var Quiz = require('./models/Quiz');
var FQuiz = require('./models/FQuiz');
var Story = require('./models/Story');


app.get('/', function(req,res){
    res.render('index');
})


//Professor API-----------------------------------------------------
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
    var gender= req.body.gender;
    var newProfessor = {
        name:name,
        number:number,
        qualification:qualification,
        institute:institute,
        gender:gender
    }
    Professor.create(newProfessor, function(err, newlyData){
        if(err){
            console.log('error',err);
        }else{
            console.log('Data Pushed', newlyData);
            res.redirect('/viewProfessors');
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

//Matrimony API----------------------------------------------------------

app.post('/matrimony', function(req,res){
    var name = req.body.name;
    var gender = req.body.gender;
    var dob = req.body.dob;
    var maritalStatus = req.body.maritalStatus;
    var nativePlace = req.body.nativePlace;
    var height = req.body.height;
    var education = req.body.education;
    var jobProfile = req.body.jobProfile;
    var dateOfBaptism = req.body.dateOfBaptism;
    var Residance = req.body.Residance;
    var contactNo = req.body.contactNo;
    var PastorName = req.body.PastorName;
    var PastorMobileNo  = req.body.PastorMobileNo;
    var Father = req.body.Father;
    var Mother = req.body.Mother;
    var brother = req.body.brother;
    var sister = req.body.sister;
    var partner = req.body.partner;
    var church = req.body.church;

    var newData = {
        name:name,
        gender:gender,
        dob:dob,
        maritalStatus:maritalStatus,
        nativePlace:nativePlace,
        height:height,
        education:education,
        jobProfile:jobProfile,
        dateOfBaptism:dateOfBaptism,
        Residance:Residance,
        contactNo:contactNo,
        PastorName:PastorName,
        PastorMobileNo:PastorMobileNo,
        Father:Father,
        Mother:Mother,
        brother:brother,
        sister:sister,
        partner:partner,
        church:church
    }

    Matrimony.create(newData, function(err, newlyData){
        if(err){
            console.log('error occured', err);
        }else{
            res.send('Done');
        }
    })


})

app.get('/viewMatrimony', function(req,res){
    Matrimony.find({}, function(err, data){
        if(err){
            console.log('error occured', err);
            res.send('Some Error Occured');
        }else{
            console.log('here is your data');
            res.render('viewMatrimony',{data:data});
        }
    })
})

app.delete('/viewMatrimony/:id', function(req,res){
    console.log('here it is',req.params.id);
    Matrimony.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log('error occured while deleting',err );
            res.send('Error Occured, Go back and try again');
        }else{
            console.log('delete successful');
            res.redirect('/viewMatrimony');
        }
    })
})



app.get('/allMatrimony', function(req,res){
    Matrimony.find({}, function(err,data){
        if(err){
            console.log(err);
            res.send(err);
        }else{
            res.send(data);
        }
    })
})



// Main Quiz API ---------------------------------------------------------------------
app.get('/quiz', function(req,res){
    res.render('quiz');
});

app.get('/quizForm', function(req,res){
    Question.find({},function(err,data){
        if(err){
            console.log('error',err);
        }else{
            res.render('quizForm',{data:data});

        }
    })
})

app.post('/quizForm', function(req,res){
    var options = [req.body.optionA,req.body.optionB,req.body.optionC,req.body.optionD]
    var question  = {
        question: req.body.question,
        options: options,
        answer: req.body.answer
    }

    console.log(question);

    Question.create(question, function(err,data){
        if(err){
            console.log('Error Occured');
            res.send('Some Error Occured');
        }else{
            console.log('Check This One', data);
            res.redirect('/quizForm');
        }

    })
})

app.get('/finish', function(req,res){
    res.render('finish');
})

app.post('/finish', function(req,res){
    console.log(req.body);
    questions = [];
    Question.find({},async function(err, data){
        if(err){
            console.log(err);
        }else{
            console.log('No error should work');
            question = await data;
            question.forEach((each)=>{
                questions.push(each);
            })
            console.log('now check', questions, typeof(questions), questions.length);
            var quizData = {
                name: req.body.name,
                live_time: req.body.live_time,
                title: req.body.title,
                questions: questions
            }
            Quiz.create(quizData, function(err, data){
                if(err){
                    console.log(err);
                    res.send('Error Occured, Contact Dev Team');
                }else{
                    console.log('Quiz has Been Created');
                    Question.remove({}, function(err){
                        if(err){
                            console.log('Error Occured');
                        }else{
                            res.redirect('viewQuiz');
                        }
                    })
                }
            })
        }
    })
})


app.get('/allQuiz', function(req,res){
    Quiz.find({}, function(err,data){
        if(err){
            console.log(err);
            res.send('Error Occured');
        }else{
            res.send(data);
        }
    })
});

app.get('/viewQuiz',function(req,res){
    Quiz.find({},function(err,data){
        if(err){
            console.log(err);
            res.send(err);
        }else{
            res.render('viewQuiz',{data:data});
        }
    })
})

app.delete('/viewQuiz/:id', function(req,res){
    console.log('check this param', req.params.id);
    Quiz.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.send(err);
        }else{
            console.log('Quiz delete Done');
            res.redirect('/viewQuiz');
        }
    })
})

//Kids -------------------------------------------------------------------------

app.get('/kids', function(req,res){
    res.render('kids');
})

app.post('/kids', function(req,res){
    story = {
        story: req.body.story
        }
    Story.create(story, function(err, data){
        if(err){
            console.log('error Occured', err);
            res.send('Error Occured');
        }else{
            res.redirect('/viewStory');
        }
    })
})

app.get('/viewStory', function(req,res){
    Story.find({}, function(err, data){
        if(err){
            console.log('error occured', err);
            res.send("Error Occured while fetching Stories");
        }else{
            res.render('viewStory', {data:data});
        }
    })
})

app.delete('/viewStory/:id', function(req,res){
    console.log('check this id', req.params.id);
    Story.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log('Error while deleting', err);
            res.send('Error Occured');
        }else{
            res.redirect('/viewStory');
        }
    })
})


app.get('/allStory', function(req,res){
    Story.find({},function(err, data){
        if(err){
            console.log("Error", err);
            res.send(err);
        }else{
            res.send(data);
        }
    })
})


//FaceOff API-----------------------------------------------------------------------------
app.get('/faceoff', function(req,res){
    res.render('faceoff');
})

app.get('/faceofForm', function(req,res){

    Question.find({},function(err,data){
        if(err){
            res.send(err);
        }else{
            res.render('faceofForm',{data:data});
        }
    })
})

app.post('/faceofForm', function(req,res){
    console.log(req.body);
    var options = [req.body.optionA,req.body.optionB,req.body.optionC,req.body.optionD];
    var question  = {
        question: req.body.question,
        options: options,
        answer: req.body.answer
    }
    Question.create(question, function(err,data){
        if(err){
            res.send(err);
        }else{
            console.log("Question Post Done",data);
            res.redirect('/faceofForm');
        }
    })
})

app.get('/end', function(req,res){
    res.render('end');
})

app.post('/end', function(req,res){
    console.log(req.body);
    var questions = [];
    Question.find({},async function(err,data){
        if(err){
            res.send(err);
        }else{
            var response = await data;
            response.forEach((each)=>{
                questions.push(each);
            });
            var quizData  = {
                name: req.body.name,
                live_time:req.body.live_time,
                questions: questions,
                title: req.body.title,
                email1: req.body.email1,
                email2: req.body.email2
            }
            FQuiz.create(quizData, function(err, data){
                if(err){
                    res.send(err);
                }else{
                    console.log('Face Off Quiz Created');
                    Question.remove({}, function(err){
                        if(err){
                            res.send(err);
                        }else{
                            res.redirect('/viewFQuiz');
                        }
                    })
                }
            })
        }
    })
})


app.get('/allFQuiz',function(req,res){
    FQuiz.find({}, function(err,data){
        if(err){
            console.log("Error Occured",err);
            res.send(err);
        }else{
            res.send(data);
        }
    })
})


app.get('/viewFQuiz', function(req,res){
    FQuiz.find({}, function(err,data){
        if(err){
            res.send(err);
        }else{
            res.render('viewFQuiz', {data:data});
        }
    })
});


app.delete('/viewFQuiz/:id',function(req,res){
    FQuiz.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.send(err);
        }else{
            console.log('Remove Done');
            res.redirect('/viewFQuiz');
        }
    })
} )


app.get('*', function(req,res){
    res.render('default');
})

app.set("port", process.env.PORT || 4000);
app.listen(app.get("port"), function(req,res){
      console.log("Application running in port: " + app.get("port"));
});