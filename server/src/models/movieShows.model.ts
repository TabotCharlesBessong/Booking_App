import { Schema, model } from "mongoose";

export interface MovieShow {
  id: string;
  language: string;
  showDate: Date;
  showStartTime: Date;
  showEndTime: Date;
  location: string;
}

export const MovieShowSchema = new Schema<MovieShow>(
  {
    language: { type: String },
    showDate: { type: Date, required: true },
    showStartTime: { type: Date, required: true },
    showEndTime: { type: Date, required: true },
    location: { type: String, required: true },
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

export const MovieShowModel = model("movieShow", MovieShowSchema);
