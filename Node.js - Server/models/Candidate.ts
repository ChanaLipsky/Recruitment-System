import mongoose, { Document, Schema } from 'mongoose';
import { validateId, validateString, validateEmail, validatePhone, validatePercentage, validateBoolean } from '../utils/validator';

export interface ICandidate extends Document {
  positionId: string;
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
  totalScore: string;
}

const CandidateSchema: Schema = new Schema({
  positionId: { type: String, required: true, validate: validateId },
  firstName: { type: String, required: true, validate: validateString },
  lastName: { type: String, required: true, validate: validateString },
  emailAddress: { type: String, required: true, validate: validateEmail },
  phoneNumber: { type: String, required: true, validate: validatePhone },
  cognitiveTestScore: { type: Number, required: true, validate: validatePercentage },
  personalityTestScore: { type: Number, required: true, validate: validatePercentage },
  hasInterview: { type: Boolean, required: true, validate: validateBoolean },
  hasReliabilityTest: { type: Boolean, required: true, validate: validateBoolean },
  hasTaskPassed: { type: Boolean, required: true, validate: validateBoolean },
  hasJobOffer: { type: Boolean, required: true, validate: validateBoolean },
  isEmployed: { type: Boolean, required: true, validate: validateBoolean },
  totalScore: { type: String, required: true, validate: validateId },
});

export default mongoose.model<ICandidate>('Candidate', CandidateSchema);
