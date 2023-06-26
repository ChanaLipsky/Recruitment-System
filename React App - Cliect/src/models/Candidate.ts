export interface Candidate {
    _id: string;
    jobId: string;
    firstName: string;
    lastName: string;
    emailAddress: string;
    phoneNumber: string;
    cognitiveTestScore: number;
    personalityTestScore: number;
    hasInterview: boolean;
    hasReliabilityTest: boolean;
    hasTaskPassed: boolean;
    hasJobOffer: boolean;
    isEmployed: boolean;
    totalScore: number;
  }
  