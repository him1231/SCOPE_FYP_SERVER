import { Request, Response } from 'express';
import axios, { AxiosResponse } from 'axios';
import { StopInput } from '../models/stop.model';
import { createStops } from '../service/stop.service';

export async function updateStopsHandler(req: Request, res: Response) {
  try {
    const API_STOP_DATA =
      'https://static.data.gov.hk/td/pt-headway-en/stops.txt';

    let apiResult: AxiosResponse = await axios.get(API_STOP_DATA);

    const data: StopInput[] = (apiResult.data as string)
      .split('\r\n')
      .map((item) => item.split(',22.'))
      .filter((item) => item.length === 2)
      .map((item) => {
        const arr1 = item[0].split(',');
        const first = arr1.shift();
        return [first, arr1.join(','), ...`22.${item[1]}`.split(',')];
      })
      .filter((values, index) => values.length === 7)
      .map((values) => {
        return {
          stopId: values[0] ?? '',
          name: values[1] ?? '',
          lat: Number(values[2]),
          lon: Number(values[3]),
          zoneId: values[4] ?? '',
          locationType: values[5] ?? '',
          timezone: values[6] ?? '',
        };
      });

    const result = await createStops(data);

    return res.send({ status: 'success', result });
  } catch (error) {
    return res.send({ status: 'error', error });
  }
}
