import mongoose from 'mongoose';

export interface AgencyInput {
  key: string;
  name: string;
  url: string;
  timezone: string;
  lang: string;
}

export interface AgencyDocument extends AgencyInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const agencySchema = new mongoose.Schema(
  {
    key: { type: String, unique: true },
    name: { type: String },
    url: { type: String },
    timezone: { type: String },
    lang: { type: String },
  },
  {
    timestamps: true,
  }
);

const AgencyModel = mongoose.model<AgencyDocument>('Agency', agencySchema);

export default AgencyModel;
