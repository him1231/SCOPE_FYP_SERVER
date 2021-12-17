import { Request, Response } from 'express';
import axios, { AxiosResponse } from 'axios';
import { createAgencys } from '../service/agency.service';
import { AgencyInput } from '../models/agency.model';
import { values } from 'lodash';

export async function updateAgencysHandler(req: Request, res: Response) {
  try {
    const API_AGENCY_DATA =
      'https://static.data.gov.hk/td/pt-headway-en/agency.txt';

    let apiResult: AxiosResponse = await axios.get(API_AGENCY_DATA);

    const data: AgencyInput[] = (apiResult.data as string)
      .split('\r\n')
      .map((item) => item.split(','))
      .filter((values, index) => values.length === 5 && index !== 0)
      .map((values) => {
        return {
          key: values[0],
          name: values[1],
          url: values[2],
          timezone: values[3],
          lang: values[4],
        };
      });

    const result = await createAgencys(data);

    return res.send({ status: 'success', result });
  } catch (error) {
    return res.send({ status: 'error', error });
  }
}
