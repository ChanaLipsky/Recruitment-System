// routes/user.ts

import { Router, Request, Response } from 'express';
import JobModel, { IJob } from '../models/JobModel';
const router: Router = Router();

// GET /users
router.get('/', async (req: Request, res: Response) => {
  try {
    const jobs: IJob[] = await JobModel.find();
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /users
router.post('/', async (req: Request, res: Response) => {
  try {
    const { /** Fields from schema */ }: IJob = req.body;
    const user: IJob = new JobModel({  /** Fields from schema */ });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
