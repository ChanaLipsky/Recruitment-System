import express, { Request, Response } from 'express';
// import cors from 'cors'
import bodyParser from 'body-parser';
import JobRouter from './routes/jobRouter';
import CandidateRouter from './routes/candidateRouter';
import connectDB from './connection';
const app=express();
const port=3000;

// app.use(cors());
app.use(bodyParser.json());
app.use('/api/job', JobRouter);
app.use('/api/candidate', CandidateRouter);
connectDB();
app.get('/',(req,res)=>{res.send('mongo-node-project')})

app.listen(port,()=>console.log(`listen to port ${port}`))


