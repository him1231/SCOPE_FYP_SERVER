import CalendarModel, { CalendarInput } from '../models/calendar.model';

export async function createCalendars(inputs: CalendarInput[]) {
  const result = await CalendarModel.bulkWrite(
    inputs.map((item) => ({
      updateOne: {
        filter: { serviceId: item.serviceId },
        update: { $set: item },
        upsert: true,
      },
    }))
  );

  return result;
}
