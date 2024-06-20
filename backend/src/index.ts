import express from 'express';
import { apirouter } from './api/router';
import cors from 'cors'
const port =process.env.PORT||3000;

const app=express();
app.use(cors())
app.use(express.json())
app.use('/',apirouter)
app.listen(port,()=>{
    console.log(`the server is running`)
})