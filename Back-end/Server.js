const express= require('express')
const cors=require('cors')
const connection = require('./Mongo/Mongoose')
const dotenv=require('dotenv')
const router = require('./Router')

connection()


const app=express()
app.use(express.json())
app.use(cors())
app.use('/',router)
dotenv.config()



port=5050
app.listen(port,console.log(`Running on ${port}`))