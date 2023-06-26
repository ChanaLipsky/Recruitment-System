import mongoose, { Document, Schema } from 'mongoose';
import { validateString, validateDate, validateRequirements, validateId } from '../utils/validator';

export interface IJob extends Document {
  _id:string,
  name: string;
  location: string;
  date: Date;
  companyDescription: string;
  jobDescription: string;
  requirements: string[];
}

const JobSchema: Schema = new Schema({
  _id:{ type: String, required: true, validate: validateId },
  name: { type: String, required: true, validate: validateString },
  location: { type: String, required: true, validate: validateString },
  date: { type: Date, required: true, validate: validateDate },
  companyDescription: { type: String, required: true, validate: validateString },
  jobDescription: { type: String, required: true, validate: validateString },
  requirements: {
    type: [String],
    required: true,
    validate: [validateRequirements, 'Invalid requirements'],
  },
},{
  versionKey: false,
});

export default mongoose.model<IJob>('Job', JobSchema);
