import * as mongoose from 'mongoose';
import { JobSchema } from '../models/JobModel';
import { Request, Response } from 'express';

const Job = mongoose.model('Job', JobSchema);

export class JobController{

    public addNewJob (req: Request, res: Response) {                
        let newJob = new Job(req.body);
    
        newJob.save((err, job) => {
            if(err){
                res.send(err);
            }    
            res.json(job);
        });
    }

    public getJobs (req: Request, res: Response) {           
        Job.find({}, (err, contact) => {
            if(err){
                res.send(err);
            }
            res.json(contact);
        });
    }

    public getJobWithID (req: Request, res: Response) {           
        Job.findById(req.params.jobId, (err, job) => {
            if(err){
                res.send(err);
            }
            res.json(job);
        });
    }

    public updateJob (req: Request, res: Response) {           
        Job.findOneAndUpdate({ _id: req.params.jobId }, req.body, { new: true }, (err, job) => {
            if(err){
                res.send(err);
            }
            res.json(job);
        });
    }

    public deleteJob (req: Request, res: Response) {           
        Job.remove({ _id: req.params.jobId }, (err, job) => {
            if(err){
                res.send(err);
            }
            res.json({ message: 'Successfully deleted job!'});
        });
    }
    
}