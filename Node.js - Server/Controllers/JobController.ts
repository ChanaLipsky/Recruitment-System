import * as mongoose from 'mongoose';
import { JobSchema, JobModel } from '../models/JobModel';
import { Request, Response } from 'express';

export class JobController {
    private handleResponse(res: Response, err: any, data: any) {
        if (err) {
            res.send(err);
        } else {
            res.json(data);
        }
    }

    public async addNewJob(req: Request, res: Response) {
        let newJob = new JobModel(req.body);

        await newJob.save((err, job) => {
            this.handleResponse(res, err, job);
        });
    }

    public async getJobs(req: Request, res: Response) {
        await JobModel.find({}, (err, jobs) => {
            this.handleResponse(res, err, jobs);
        });
    }

    public async getJobWithID(req: Request, res: Response) {
        await JobModel.findById(req.params.jobId, (err, job) => {
            this.handleResponse(res, err, job);
        });
    }

    public async updateJob(req: Request, res: Response) {
        await JobModel.findOneAndUpdate(
            { _id: req.params.jobId },
            req.body,
            { new: true },
            (err, job) => {
                this.handleResponse(res, err, job);
            }
        );
    }

    public async deleteJob(req: Request, res: Response) {
        await JobModel.remove({ _id: req.params.jobId }, (err, job) => {
            if (err) {
                res.send(err);
            } else {
                res.json({ message: 'Successfully deleted job!' });
            }
        });
    }
}
