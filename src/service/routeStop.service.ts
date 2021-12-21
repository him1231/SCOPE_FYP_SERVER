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

export async function getAllRouteStops() {
  var itemMap: { [key: string]: RouteStopInput } = {};

  const result = await routeStopModel.find();

  result.forEach(function (item) {
    itemMap[item._id] = item;
  });

  return itemMap;
}

export async function getAllRouteStopsByKey() {
  var itemMap: { [key: string]: RouteStopInput } = {};

  const result = await routeStopModel.find();

  result.forEach(function (item) {
    itemMap[item.key] = item;
  });

  return itemMap;
}
