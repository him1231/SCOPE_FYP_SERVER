import mongoose from 'mongoose';

export interface CalendarInput {
  serviceId: string;
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean;
  sunday: boolean;
  startDate: string;
  endDate: string;
}

export interface CalendarDocument extends CalendarInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const calendarSchema = new mongoose.Schema(
  {
    serviceId: { type: String, unique: true },
    monday: { type: Boolean, default: false },
    tuesday: { type: Boolean, default: false },
    wednesday: { type: Boolean, default: false },
    thursday: { type: Boolean, default: false },
    friday: { type: Boolean, default: false },
    saturday: { type: Boolean, default: false },
    sunday: { type: Boolean, default: false },
    startDate: { type: String },
    endDate: { type: String },
  },
  {
    timestamps: true,
  }
);

const CalendarModel = mongoose.model<CalendarDocument>(
  'Calendar',
  calendarSchema
);

export default CalendarModel;
