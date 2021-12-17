import mongoose from 'mongoose';

export interface CalendarDateInput {
  key: string;
  serviceId: string;
  date: string;
  exceptionType: string;
}

export interface CalendarDateDocument
  extends CalendarDateInput,
    mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const calendarDateSchema = new mongoose.Schema(
  {
    key: { type: String, unique: true },
    date: { type: String },
    serviceId: { type: String },
    exceptionType: { type: String },
  },
  {
    timestamps: true,
  }
);

const CalendarDateModel = mongoose.model<CalendarDateDocument>(
  'CalendarDate',
  calendarDateSchema
);

export default CalendarDateModel;
