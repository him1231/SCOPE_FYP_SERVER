import mongoose from 'mongoose';
import { StopDocument } from './stop.model';
import { RouteDocument } from './route.model';
import { string } from 'zod';

export interface RouteStopInput {
  key: string;
  route: RouteDocument['_id'];
  bound: string;
  seq: number;
  stop: StopDocument['_id'];
}

export interface RouteStopDocument extends RouteStopInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const routeStopSchema = new mongoose.Schema(
  {
    key: { type: String, unique: true },
    route: { type: mongoose.Schema.Types.ObjectId, ref: 'Route' },
    bound: { type: String },
    seq: { type: Number },
    stop: { type: mongoose.Schema.Types.ObjectId, ref: 'Stop' },
  },
  {
    timestamps: true,
  }
);

const routeStopModel = mongoose.model<RouteStopDocument>(
  'RouteStop',
  routeStopSchema
);

export default routeStopModel;
