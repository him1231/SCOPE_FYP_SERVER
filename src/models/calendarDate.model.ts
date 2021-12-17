import mongoose from 'mongoose';
import { CalendarDocument } from './calendar.model';

export interface CalendarDateInput {
  key: string;
  calendar: CalendarDocument['_id'];
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
    calendar: { type: mongoose.Schema.Types.ObjectId, ref: 'Calendar' },
    date: { type: String },
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
