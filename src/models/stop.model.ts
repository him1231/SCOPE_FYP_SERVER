import mongoose from 'mongoose';

export interface StopInput {
  stopId: string;
  name: string;
  lat: number;
  lon: number;
  zoneId: string;
  locationType: string;
  timezone: string;
}

export interface StopDocument extends StopInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const stopSchema = new mongoose.Schema(
  {
    stopId: { type: String, unique: true },
    name: { type: String },
    lat: { type: Number },
    lon: { type: Number },
    zoneId: { type: String },
    locationType: { type: String },
    timezone: { type: String },
  },
  {
    timestamps: true,
  }
);

const StopModel = mongoose.model<StopDocument>('Stop', stopSchema);

export default StopModel;
