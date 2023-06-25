import { Request, Response } from 'express';
import Job, { IJob } from '../models/Job';

export const createJob = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      name,
      location,
      date,
      companyDescription,
      jobDescription,
      requirements,
    } = req.body;

    const job: IJob = new Job({
      name,
      location,
      date,
      companyDescription,
      jobDescription,
      requirements,
    });

    const savedJob = await job.save();
    res.json(savedJob);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while creating the job.', error });
  }
};

export const updateJob = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      name,
      location,
      date,
      companyDescription,
      jobDescription,
      requirements,
    } = req.body;

    const job = await Job.findByIdAndUpdate(
      req.params.id,
      {
        name,
        location,
        date,
        companyDescription,
        jobDescription,
        requirements,
      },
      { new: true }
    );

    if (!job) {
       res.status(404).json({ message: 'Job not found.' });
    }

    res.json(job);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while updating the job.', error });
  }
};

export const getJobs = async (_req: Request, res: Response): Promise<void> => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while fetching the jobs.', error });
  }
};

export const getJobById = async (req: Request, res: Response): Promise<void> => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
       res.status(404).json({ message: 'Job not found.' });
    }
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while fetching the job.', error });
  }
};

export const deleteJob = async (req: Request, res: Response): Promise<void> => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) {
       res.status(404).json({ message: 'Job not found.' });
    }
    res.json({ message: 'Job deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while deleting the job.', error });
  }
};
