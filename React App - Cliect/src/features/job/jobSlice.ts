import { createSlice, PayloadAction} from '@reduxjs/toolkit';
import { Job } from '../../models/Job';
import { RootState } from '../../store';
import { fetchJobs, createJob, updateJob, deleteJob } from '../../api/jobApi';

interface JobState {
  jobs: Job[];
  isLoading: boolean;
  error: string | null;
}

const initialState: JobState = {
  jobs: [],
  isLoading: false,
  error: null,
};

const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    fetchJobsStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    fetchJobsSuccess(state, action: PayloadAction<Job[]>) {
      state.jobs = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    fetchJobsFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    createJobStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    createJobSuccess(state, action: PayloadAction<Job>) {
      state.jobs.push(action.payload);
      state.isLoading = false;
      state.error = null;
    },
    createJobFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    updateJobStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    updateJobSuccess(state, action: PayloadAction<Job>) {
      const updatedJob = action.payload;
      const index = state.jobs.findIndex(job => job._id === updatedJob._id);
      if (index !== -1) {
        state.jobs[index] = updatedJob;
      }
      state.isLoading = false;
      state.error = null;
    },
    updateJobFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    deleteJobStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    deleteJobSuccess(state, action: PayloadAction<string>) {
      const jobId = action.payload;
      state.jobs = state.jobs.filter(job => job._id !== jobId);
      state.isLoading = false;
      state.error = null;
    },
    deleteJobFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchJobsStart,
  fetchJobsSuccess,
  fetchJobsFailure,
  createJobStart,
  createJobSuccess,
  createJobFailure,
  updateJobStart,
  updateJobSuccess,
  updateJobFailure,
  deleteJobStart,
  deleteJobSuccess,
  deleteJobFailure,
} = jobSlice.actions;

export const selectJobs = (state: RootState) => state.job.jobs;
export const selectJobsLoading = (state: RootState) => state.job.isLoading;
export const selectJobsError = (state: RootState) => state.job.error;

export default jobSlice.reducer;

export const fetchAllJobs = () => async (dispatch: any) => {
  try {
    dispatch(fetchJobsStart());
    const jobs = await fetchJobs();
    dispatch(fetchJobsSuccess(jobs));
  } catch (error:any) {
    dispatch(fetchJobsFailure(error.message));
  }
};

export const createNewJob = (jobData: any) => async (dispatch: any) => {
  try {
    dispatch(createJobStart());
    const newJob = await createJob(jobData);
    dispatch(createJobSuccess(newJob));
  } catch (error:any) {
    dispatch(createJobFailure(error.message));
  }
};

export const updateExistingJob = (jobId: string, jobData: any) => async (dispatch: any) => {
  try {
    dispatch(updateJobStart());
    const updatedJob = await updateJob(jobId, jobData);
    dispatch(updateJobSuccess(updatedJob));
  } catch (error:any) {
    dispatch(updateJobFailure(error.message));
  }
};

export const deleteExistingJob = (jobId: string) => async (dispatch: any) => {
  try {
    dispatch(deleteJobStart());
    await deleteJob(jobId);
    dispatch(deleteJobSuccess(jobId));
  } catch (error:any) {
    dispatch(deleteJobFailure(error.message));
  }
};
