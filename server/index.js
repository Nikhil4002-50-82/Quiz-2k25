import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import {Pool} from "pg"

const app=express()
const port=5000

app.use(cors())
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())

const db = new Pool({
    user: 'postgres',
    password: '5432',
    host: 'localhost',
    port: 5432,
    database: 'quiz-2k25',
})

app.post("/addNewTeacher",async(req,res)=>{
    const { name, password } = req.body;
    try{
        response=await db.query("INSERT INTO teachers ('name','password') VALUES ($1,$2)",[name,password])
        res.status(200).json({ message: "Teacher added." });
    }
    catch(error){
        console.log(`error message : ${error.message}`)
        res.status(500).json({ error: "Failed to add teacher." });
    }
})

app.post("/addNewStudent",async(req,res)=>{
    const { name, password } = req.body;
    try{
        response=await db.query("INSERT INTO students ('name','password') VALUES ($1,$2)",[])
        res.status(200).json({ message: "Students added." });
    }
    catch(error){
        console.log(`error message : ${error.message}`)
        res.status(500).json({ error: "Failed to add teacher." });
    }
})

app.post("/addquiz",async(req,res)=>{
    const {title,description,date,timelimit,teacherid} =req.body
    try{
        response=await db.query("INSERT INTO quizzes ('title','description','date','timelimit','teacherid') VALUES ($1,$2,$3,$4,$5)",[title,description,date,timelimit,teacherid])
        res.status(200).json({ message: "quiz added." });
    }
    catch(error){
        console.log(`error message : ${error.message}`)
        res.status(500).json({ error: "Failed to add quiz." });
    }
})

app.post("/addquestion",async(req,res)=>{
    const {quizid,question,questiontype,options} =req.body
    try{
        response=await db.query("INSERT INTO quizzes ('quizid','question','questiontype') VALUES ($1,$2,$3)",[quizid,question,questiontype])
        res.status(200).json({ message: "questions added." });
        const questionid = questionRes.rows[0].questionid;
         for (let option of options) {
            await db.query(
                "INSERT INTO options (questionid, optionstext, correct_option) VALUES ($1, $2, $3)",
                [questionid, option.optionstext, option.correct_option]
            );
        }
    }
    catch(error){
        console.log(`error message : ${error.message}`)
        res.status(500).json({ error: "Failed to add questions." });
    }
})

app.get("/quizzes", async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM quizzes");
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch quizzes." });
    }
});

app.get("/questions/:quizid", async (req, res) => {
    const { quizid } = req.params;
    try {
        const questions = await db.query("SELECT * FROM questions WHERE quizid = $1", [quizid]);
        const result = [];
        for (let q of questions.rows) {
            const options = await db.query("SELECT * FROM options WHERE questionid = $1", [q.questionid]);
            result.push({ ...q, options: options.rows });
        }
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch questions." });
    }
});

app.listen(port,(req,res)=>{
    console.log(`Server running on port ${port}.`)
})