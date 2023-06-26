import validator from 'validator';
import { PhoneNumberUtil } from 'google-libphonenumber';
import { Request } from 'express';
import Job from '../models/Job';

const phoneUtil = PhoneNumberUtil.getInstance();

export const validateEmail = (email: string): boolean => {
  return validator.isEmail(email);
};

export const validatePhone = (phone: string): boolean => {
  try {
    const phoneNumber = phoneUtil.parse(phone, 'IL');
    return phoneUtil.isValidNumber(phoneNumber);
  } catch (error) {
    return false;
  }
};

export const validateString = (value: string): boolean => {
  return !validator.isEmpty(value);
};

export const validatePercentage = (percentage: number): boolean => {
  return percentage >= 0 && percentage <= 100;
};

export const validateBoolean = (value: boolean): boolean => {
  return typeof value === 'boolean';
};

export const validateId = (id: string): boolean => {
  return validator.isUUID(id);
};



export const validateDate = (date: string): boolean => {
  return validator.isDate(date);
};

export const validateRequirements = (requirements: string[]): boolean => {
  return requirements.every((requirement) => typeof requirement === 'string' && validateString(requirement));
};

export const validateJobId = async (id: string): Promise<boolean> => {
  const job = await Job.findOne({ id });
  return !job;
};

export const validateCandidateBody = async (req: Request): Promise<boolean> => {
  const {
    _id,
    jobId,
    firstName,
    lastName,
    emailAddress,
    phoneNumber,
    cognitiveTestScore,
    personalityTestScore,
    hasInterview,
    hasReliabilityTest,
    hasTaskPassed,
    hasJobOffer,
    isEmployed,
    totalScore,
  } = req.body;

  const isJobIdValid = await validateJobId(jobId);

  return (
    validateId(_id) &&
    isJobIdValid &&
    validateString(firstName) &&
    validateString(lastName) &&
    validateEmail(emailAddress) &&
    validatePhone(phoneNumber) &&
    validatePercentage(cognitiveTestScore) &&
    validatePercentage(personalityTestScore) &&
    validateBoolean(hasInterview) &&
    validateBoolean(hasReliabilityTest) &&
    validateBoolean(hasTaskPassed) &&
    validateBoolean(hasJobOffer) &&
    validateBoolean(isEmployed) &&
    validatePercentage(totalScore)
  );
};

export const validateJobBody = async (req: Request)=> {
  const { _id, jobId, name, location, date, companyDescription, jobDescription, requirements } = req.body;

  return (
    validateId(_id)&&
    validateString(name) &&
    validateString(location) &&
    validateDate(date) &&
    validateString(companyDescription) &&
    validateString(jobDescription) &&
    validateRequirements(requirements)
  );
};
