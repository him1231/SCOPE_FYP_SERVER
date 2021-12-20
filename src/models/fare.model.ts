import mongoose from 'mongoose';
import { AgencyDocument } from './agency.model';
import { RouteDocument } from './route.model';
import { StopDocument } from './stop.model';

export interface FareInput {
  fareId?: string;
  price?: number;
  currencyType?: string;
  paymentMethod?: string;
  transfers?: string;
  agency?: AgencyDocument['_id'];
  route?: RouteDocument['_id'];
  originStop?: StopDocument['_id'];
  destinationStop?: StopDocument['_id'];
}

export interface FareDocument extends FareInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const fareSchema = new mongoose.Schema(
  {
    fareId: { type: String, unique: true },
    price: { type: Number },
    currencyType: { type: String },
    paymentMethod: { type: String },
    transfers: { type: String },
    agency: { type: mongoose.Schema.Types.ObjectId, ref: 'Agency' },
    route: { type: mongoose.Schema.Types.ObjectId, ref: 'Route' },
    originStop: { type: mongoose.Schema.Types.ObjectId, ref: 'Stop' },
    destinationStop: { type: mongoose.Schema.Types.ObjectId, ref: 'Stop' },
  },
  {
    timestamps: true,
  }
);

const FareModel = mongoose.model<FareDocument>('Fare', fareSchema);

export default FareModel;
