import axios, { AxiosResponse } from 'axios';
import { Request, Response } from 'express';
import { RouteStopInput } from '../models/routeStop.model';
import { getAllRoutesID } from '../service/route.service';
import { createRouteStops } from '../service/routeStop.service';
import { getAllStopsID } from '../service/stop.service';

export async function updateRouteStopsHandler(req: Request, res: Response) {
  try {
    const routes = await getAllRoutesID();
    const stops = await getAllStopsID();

    const API_FARE_RULES_DATA =
      'https://static.data.gov.hk/td/pt-headway-en/fare_rules.txt';

    let apiResult: AxiosResponse = await axios.get(API_FARE_RULES_DATA);

    const dataMap: { [key: string]: RouteStopInput } = {};

    (apiResult.data as string)
      .split('\r\n')
      .map((item) => item.split(','))
      .filter((values, index) => values.length === 4 && index !== 0)
      .forEach((values) => {
        const fareId = values[0].split('-');
        const key1 = `${fareId[0]}-${fareId[1]}-${fareId[2]}`;
        dataMap[key1] = {
          key: key1,
          route: routes[values[1]],
          seq: Number(fareId[2]),
          stop: stops[values[2]],
        };

        const key2 = `${fareId[0]}-${fareId[1]}-${fareId[3]}`;
        dataMap[key2] = {
          key: key2,
          route: routes[values[1]],
          seq: Number(fareId[3]),
          stop: stops[values[3]],
        };
      });

    const data = Object.entries(dataMap).map(([key, item]) => item);

    const result = await createRouteStops(data);

    return res.send({ status: 'success', result });
  } catch (error) {
    return res.send({ status: 'error', error });
  }
}
