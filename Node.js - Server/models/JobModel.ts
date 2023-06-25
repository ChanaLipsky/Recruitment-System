
import mongoose, { Document, Schema } from 'mongoose';

export interface IJob extends Document {
    id: string;
    name: string;
    date: Date;
    location: string;
    status: boolean;
    companyDescription: string;
    jobDescription: string;
    requirements: string;
};

export const JobSchema = new Schema<IJob>({
    id:{
        type:String,
        require:true,
    },
    name:{
        type:String,
        require:true,
    },
    date:{
        type:Date,
        require:true,
    },
    location:{
        type:String,
        require:true,
    },
    status:{
        type:String,
        require:true,
    },
    companyDescription:{
        type:String,
        require:true,
    },
    jobDescription:{
        type:String,
        require:true,
    },
    requirements:{
        type:String,
        require:true,
    },



})
export default mongoose.model<IJob>('Job', JobSchema);





