import express from 'express';
import {
  createJob,
  updateJob,
  getJobs,
  getJobById,
  deleteJob,
} from '../controllers/jobController';

const router = express.Router();

router.post('/', createJob);
router.put('/:id', updateJob);
router.get('/', getJobs);
router.get('/:id', getJobById);
router.delete('/:id', deleteJob);

export default router;
