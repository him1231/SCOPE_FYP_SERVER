import mongoose from 'mongoose';
import { AgencyDocument } from './agency.model';

export interface RouteInput {
  routeId: string;
  agency: AgencyDocument['_id'];
  shortName: string;
  longName: string;
  type: string;
  url: string;
}

export interface RouteDocument extends RouteInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const routeSchema = new mongoose.Schema(
  {
    routeId: { type: String, unique: true },
    agency: { type: mongoose.Schema.Types.ObjectId, ref: 'Agency' },
    shortName: { type: String },
    longName: { type: String },
    type: { type: String },
    url: { type: String },
  },
  {
    timestamps: true,
  }
);

const routeModel = mongoose.model<RouteDocument>('Route', routeSchema);

export default routeModel;
