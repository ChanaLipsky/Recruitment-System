import { Request, Response } from 'express';
import Job, { IJob } from '../models/Job';
import { generateUniqueId } from '../utils/uuidGenerator';
export const createJob = async (req: Request, res: Response): Promise<Response> => {
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
      _id: generateUniqueId(),
      name,
      location,
      date,
      companyDescription,
      jobDescription,
      requirements,
    });

    const savedJob = await job.save();
    return res.json(savedJob);
  } catch (error) {
    return res.status(500).json({ message: 'An error occurred while creating the job.', error });
  }
};

export const updateJob = async (req: Request, res: Response): Promise<Response> => {
  try {
    const {
      _id,
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
        _id,
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
       return res.status(404).json({ message: 'Job not found.' });
    }

    return res.json(job);
  } catch (error) {
    return res.status(500).json({ message: 'An error occurred while updating the job.', error });
  }
};

export const getJobs = async (_req: Request, res: Response): Promise<Response> => {
  try {
    const jobs = await Job.find();
    return res.json(jobs);
  } catch (error) {
    return res.status(500).json({ message: 'An error occurred while fetching the jobs.', error });
  }
};

export const getJobById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
       return res.status(404).json({ message: 'Job not found.' });
    }
    return res.json(job);
  } catch (error) {
    return res.status(500).json({ message: 'An error occurred while fetching the job.', error });
  }
};

export const deleteJob = async (req: Request, res: Response): Promise<Response> => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) {
       return res.status(404).json({ message: 'Job not found.' });
    }
    return res.json({ message: 'Job deleted successfully.' });
  } catch (error) {
    return res.status(500).json({ message: 'An error occurred while deleting the job.', error });
  }
};
