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

app.listen(port,(req,res)=>{
    console.log(`Server running on port ${port}.`)
})