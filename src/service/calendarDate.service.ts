import CalendarDateModel, {
  CalendarDateInput,
} from '../models/calendarDate.model';

export async function createCalendarDates(inputs: CalendarDateInput[]) {
  const result = await CalendarDateModel.bulkWrite(
    inputs.map((item) => ({
      updateOne: {
        filter: { key: item.key },
        update: { $set: item },
        upsert: true,
      },
    }))
  );

  return result;
}
