import { Schema, model } from "mongoose";

export interface MovieShow {
  id: string;
  language: string;
  showDate: Date;
  showStartTime: Date;
  showEndTime: Date;
  location: string;
  programType: "movie" | "show";
}

export const MovieShowSchema = new Schema<MovieShow>(
  {
    language: { type: String },
    showDate: { type: Date, required: true },
    showStartTime: { type: Date, required: true },
    showEndTime: { type: Date, required: true },
    location: { type: String, required: true },
    programType: { type: String, enum: ["movie", "show"], required: true },
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
