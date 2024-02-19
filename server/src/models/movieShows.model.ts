import mongoose, { Schema, Types, model } from "mongoose";

export interface MovieShow {
  id: string;
  title:string
  description:string
  language: string;
  showDate: Date;
  startTime:Date
  location: string;
  programType: "movie" | "show";
  bookings:Types.ObjectId[]
  admin:Types.ObjectId
}

export const MovieShowSchema = new Schema<MovieShow>(
  {
    language: { type: String },
    showDate: { type: Date, required: true },
    startTime: { type: Date, required: true },
    location: { type: String, required: true },
    programType: { type: String, enum: ["movie", "show"], required: true },
    title:{type:String,required:true},
    description:{type:String,required:true},
    bookings:[{type:mongoose.Types.ObjectId,ref:"ticket"}],
    admin:{type:"ObjectId",ref:"admin",required:true}
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

export const MovieShowModel = model<MovieShow>("movieShow", MovieShowSchema);
