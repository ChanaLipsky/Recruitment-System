import axios from 'axios';
import { JOB_API_BASE_URL } from './URL';
export const fetchJobs = async () => {
  const response = await axios.get(`${JOB_API_BASE_URL}`);
  return response.data;
};

export const createJob = async (jobData: any) => {
  const response = await axios.post(`${JOB_API_BASE_URL}`, jobData);
  return response.data;
};

export const updateJob = async (jobId: string, jobData: any) => {
  const response = await axios.put(`${JOB_API_BASE_URL}/${jobId}`, jobData);
  return response.data;
};

export const deleteJob = async (jobId: string) => {
  await axios.delete(`${JOB_API_BASE_URL}/${jobId}`);
};

export const fetchJobById = async (jobId: string) => {
  const response = await axios.get(`${JOB_API_BASE_URL}/${jobId}`);
  return response.data;
};
