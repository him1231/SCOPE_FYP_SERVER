import { Request, Response } from 'express';
import axios, { AxiosResponse } from 'axios';
import { CalendarDateInput } from '../models/calendarDate.model';
import { createCalendarDates } from '../service/calendarDate.service';
import { getAllCalendars } from '../service/calendar.service';

export async function updateCalendarDatesHandler(req: Request, res: Response) {
  try {
    const calendars = await getAllCalendars();

    const API_CALENDAR_DATES_DATA =
      'https://static.data.gov.hk/td/pt-headway-en/calendar_dates.txt';

    let apiResult: AxiosResponse = await axios.get(API_CALENDAR_DATES_DATA);

    const data: CalendarDateInput[] = (apiResult.data as string)
      .split('\r\n')
      .map((item) => item.split(','))
      .filter((values, index) => values.length === 3 && index !== 0)
      .map((values) => {
        return {
          key: values.join('-'),
          calendar: calendars.find((item) => item.serviceId === values[0])?._id,
          date: values[1],
          exceptionType: values[2],
        };
      });

    const result = await createCalendarDates(data);

    return res.send({ status: 'success', result });
  } catch (error) {
    return res.send({ status: 'error', error });
  }
}
