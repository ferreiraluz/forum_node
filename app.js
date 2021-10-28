const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const connection = require('./database/connection');
const Questions = require("./database/models/Questions");
const Answers = require("./database/models/Answer");
const Answer = require("./database/models/Answer");

if(connection){
    console.log("Sequelize is running too");
}else{
    console.log("ops!");
}

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get("/", (req, res)=>{
    res.render("index");
});

app.post("/question", (req, res)=>{
    const title = req.body.title;
    const body = req.body.description;

    Questions.create({
        title: title,
        body: body
    }).then(()=>{
        res.redirect("/questionlist")
    });
});

app.get("/questionlist", (req, res)=>{
    
    Questions.findAll({raw: true, order: [
        ['id', 'DESC']
    ]}).then(questions => {
        res.render("questions", {
            questions: questions
        })
    })

});

app.get("/questionlist/:id", (req, res)=>{
    const id = req.params.id;

    Questions.findOne({
        where: {id: id}
    }).then(question => {
        if(question != undefined){

            Answer.findAll({
                where: {idQuestion: question.id}
            }).then(answers => {
                res.render("questionId", {
                    answers: answers,
                    question: question
                })
            })
        }else{
            alert("Essa pergunta não existe ainda.")
        }
    })
});

app.post("/answer", (req, res)=>{
    const content = req.body.content;
    const questionId = req.body.questionId;

    Answers.create({
        content: content,
        idQuestion: questionId
    }).then(()=>{
        res.redirect("/questionlist")
    })

})

app.listen(8080, ()=>{
    console.log('Server is running');
})