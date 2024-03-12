import express from "express"
import { PORT,mongodburi } from './config.js'
import mongoose from "mongoose"
import bookroute from './routes/bookroute.js'
import cors from 'cors'

const app=express()

app.use(express.json())
app.use(cors())
// welcome
app.get('/',(req,res)=>{
    return res.status(200).send('Welcome to BookStore')
})
app.use('/books',bookroute)


mongoose.connect(mongodburi).then(()=>{
    console.log('MongoDB connected')
    app.listen(PORT,()=>{
        console.log(`Listening on ${PORT}`)
    })
})
.catch((err)=>{console.log(err)})