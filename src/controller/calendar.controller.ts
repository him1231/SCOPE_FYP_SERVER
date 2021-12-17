import axios, { AxiosResponse } from 'axios';
import { Request, Response } from 'express';
import { CalendarInput } from '../models/calendar.model';
import { createCalendars } from '../service/calendar.service';

export async function updateCalendarsHandler(req: Request, res: Response) {
  try {
    const API_CALENDAR_DATA =
      'https://static.data.gov.hk/td/pt-headway-en/calendar.txt';

    let apiResult: AxiosResponse = await axios.get(API_CALENDAR_DATA);

    const data: CalendarInput[] = (apiResult.data as string)
      .split('\r\n')
      .map((item) => item.split(','))
      .filter((values, index) => values.length === 10 && index !== 0)
      .map((values) => {
        return {
          serviceId: values[0],
          monday: Number(values[1]) === 1,
          tuesday: Number(values[2]) === 1,
          wednesday: Number(values[3]) === 1,
          thursday: Number(values[4]) === 1,
          friday: Number(values[5]) === 1,
          saturday: Number(values[6]) === 1,
          sunday: Number(values[7]) === 1,
          startDate: values[8],
          endDate: values[9],
        };
      });

    const result = await createCalendars(data);

    return res.send({ status: 'success', result });
  } catch (error) {
    return res.send({ status: 'error', error });
  }
}
