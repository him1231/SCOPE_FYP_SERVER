import { Request, Response } from 'express';
import axios, { AxiosResponse } from 'axios';
import { getAllAgencies } from '../service/agency.service';
import { createRoutes } from '../service/route.service';
import { RouteInput } from '../models/route.model';

export async function updateRoutesHandler(req: Request, res: Response) {
  try {
    const agencies = await getAllAgencies();

    const API_ROUTES_DATA =
      'https://static.data.gov.hk/td/pt-headway-en/routes.txt';

    let apiResult: AxiosResponse = await axios.get(API_ROUTES_DATA);

    const data: RouteInput[] = (apiResult.data as string)
      .split('\r\n')
      .map((item) => item.split('"'))
      .map((item) => {
        if (item.length === 3) {
          return [item[0], item[1].split(',').join(';'), item[2]].join('"');
        } else {
          return item.join('"');
        }
      })
      .map((item) => item.split(','))
      .filter((values, index) => values.length === 6 && index !== 0)
      .map((values) => {
        return {
          routeId: values[0],
          agency: agencies.find((item) => item.key === values[1])?._id,
          shortName: values[2],
          longName: values[3],
          type: values[4],
          url: values[5],
        };
      });

    const result = await createRoutes(data);

    return res.send({ status: 'success', result });
  } catch (error) {
    return res.send({ status: 'error', error });
  }
}
