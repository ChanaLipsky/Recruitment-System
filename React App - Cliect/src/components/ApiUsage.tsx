import { useEffect } from 'react';
import type {} from 'redux-thunk/extend-redux'
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAllJobs,
  createNewJob,
  deleteExistingJob,
  selectJobs,
  selectJobsLoading,
  selectJobsError,
} from '../features/job/jobSlice';
import {
  fetchAllCandidates,
  createNewCandidate,
  deleteExistingCandidate,
  selectCandidates,
  selectCandidatesLoading,
  selectCandidatesError,
} from '../features/candidate/candidateSlice';
import React from 'react';
function ApiUsage() {
  const dispatch = useDispatch();
  const jobs = useSelector(selectJobs);
  const candidates = useSelector(selectCandidates);
  const jobsLoading = useSelector(selectJobsLoading);
  const candidatesLoading = useSelector(selectCandidatesLoading);
  const jobsError = useSelector(selectJobsError);
  const candidatesError = useSelector(selectCandidatesError);

  useEffect(() => {
    dispatch(fetchAllJobs());
    dispatch(fetchAllCandidates());
  }, [dispatch]);

  const handleCreateJob = () => {
    const newJob = {
      name: 'New Job',
      location: 'Some Location',
      date: new Date(),
      companyDescription: 'Company Description',
      jobDescription: 'Job Description',
      requirements: ['Requirement 1', 'Requirement 2'],
    };
    dispatch(createNewJob(newJob));
  };

  const handleCreateCandidate = () => {
    const newCandidate = {
      jobId: "021f9e12-6693-63a33d590",
      firstName: "ayala",
      lastName: "Doe",
      emailAddress: "johndoe@example.com",
      phoneNumber: "0548412413",
      cognitiveTestScore: 85,
      personalityTestScore: 75,
      hasInterview: true,
      hasReliabilityTest: true,
      hasTaskPassed: true,
      hasJobOffer: false,
      isEmployed: false,
      totalScore: 100
    };
    dispatch(createNewCandidate(newCandidate));
  };

  const handleDeleteJob = (jobId: string) => {
    dispatch(deleteExistingJob(jobId));
  };

  const handleDeleteCandidate = (candidateId: string) => {
    dispatch(deleteExistingCandidate(candidateId));
  };

  if (jobsLoading || candidatesLoading) {
    return <div>Loading...</div>;
  }

  if (jobsError || candidatesError) {
    return <div>Error occurred while fetching data.</div>;
  }

  return (
    <div>
      <h2>Jobs:</h2>
      <ul>
        {jobs.map((job) => (
          <li key={job._id}>
            <span>{job.name}</span>
            <button onClick={() => handleDeleteJob(job._id)}>Delete</button>
          </li>
        ))}
      </ul>

      <h2>Candidates:</h2>
      <ul>
        {candidates.map((candidate) => (
          <li key={candidate._id}>
            <span>{candidate.firstName} {candidate.lastName}</span>
            <button onClick={() => handleDeleteCandidate(candidate._id)}>Delete</button>
          </li>
        ))}
      </ul>

      <button onClick={handleCreateJob}>Create New Job</button>
      <button onClick={handleCreateCandidate}>Create New Candidate</button>
    </div>
  );
}

export default ApiUsage;
