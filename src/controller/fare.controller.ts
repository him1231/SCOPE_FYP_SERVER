import { Request, Response } from 'express';
import axios, { AxiosResponse } from 'axios';
import { getAllAgencies, getAllAgenciesID } from '../service/agency.service';
import { getAllRoutes, getAllRoutesID } from '../service/route.service';
import { getAllStops, getAllStopsID } from '../service/stop.service';
import { createFares } from '../service/fare.service';
import { FareInput } from '../models/fare.model';

export async function updateFaresHandler(req: Request, res: Response) {
  try {
    const agencies = await getAllAgenciesID();
    const routes = await getAllRoutesID();
    const stops = await getAllStopsID();

    const API_FARE_ATTRIBUTES_DATA =
      'https://static.data.gov.hk/td/pt-headway-en/fare_attributes.txt';

    const API_FARE_RULES_DATA =
      'https://static.data.gov.hk/td/pt-headway-en/fare_rules.txt';

    let fareAttributesApiResult: AxiosResponse = await axios.get(
      API_FARE_ATTRIBUTES_DATA
    );
    let fareRulesApiResult: AxiosResponse = await axios.get(
      API_FARE_RULES_DATA
    );

    const dataMap: { [key: string]: FareInput } = {};

    (fareAttributesApiResult.data as string)
      .split('\r\n')
      .map((item) => item.split(','))
      .filter((values, index) => values.length === 6 && index !== 0)
      .forEach((item) => {
        dataMap[item[0]] = {
          fareId: item[0],
          price: Number(item[1]),
          currencyType: item[2],
          paymentMethod: item[3],
          transfers: item[4],
          agency: agencies[item[5]],
        };
      });

    (fareRulesApiResult.data as string)
      .split('\r\n')
      .map((item) => item.split(','))
      .filter((values, index) => values.length === 4 && index !== 0)
      .forEach((item) => {
        dataMap[item[0]]['route'] = routes[item[1]];
        dataMap[item[0]]['originStop'] = stops[item[2]];
        dataMap[item[0]]['destinationStop'] = stops[item[3]];
      });

    const data = Object.entries(dataMap).map(([key, item]) => item);

    const result = await createFares(data);

    return res.send({ status: 'success', result });
  } catch (error) {
    return res.send({ status: 'error', error });
  }
}
