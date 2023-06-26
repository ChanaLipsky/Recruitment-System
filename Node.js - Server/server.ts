import express, { Request, Response } from 'express';
import cors from 'cors'
import bodyParser from 'body-parser';
import JobRouter from './routes/jobRouter';
import CandidateRouter from './routes/candidateRouter';
import connectDB from './connection';
const app=express();
const port=3000;

// Set up CORS
app.use(cors({
    origin: true, // "true" will copy the domain of the request back
                  // to the reply. If you need more control than this
                  // use a function.

    credentials: true, // This MUST be "true" if your endpoint is
                       // authenticated via either a session cookie
                       // or Authorization header. Otherwise the
                       // browser will block the response.

    methods: 'POST,GET,PUT,OPTIONS,DELETE' // Make sure you're not blocking
                                           // pre-flight OPTIONS requests
}));app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api/job', JobRouter);
app.use('/api/candidate', CandidateRouter);
connectDB();
app.get('/',(req,res)=>{res.send('mongo-node-project')})

app.listen(port,()=>console.log(`listen to port ${port}`))


