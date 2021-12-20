import routeStopModel, { RouteStopInput } from '../models/routeStop.model';

export async function createRouteStops(inputs: RouteStopInput[]) {
  const result = await routeStopModel.bulkWrite(
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
