import express from 'express';
import { apirouter } from './api/router';
const port =process.env.PORT||3000;

const app=express();
app.use(express.json())
app.use('/',apirouter)
app.listen(port,()=>{
    console.log(`the server is running`)
})