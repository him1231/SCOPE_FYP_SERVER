import routeModel, { RouteInput } from '../models/route.model';

export async function createRoutes(inputs: RouteInput[]) {
  const result = await routeModel.bulkWrite(
    inputs.map((item) => ({
      updateOne: {
        filter: { routeId: item.routeId },
        update: { $set: item },
        upsert: true,
      },
    }))
  );

  return result;
}

export async function getAllRoutes() {
  var itemMap: { [key: string]: RouteInput } = {};

  const result = await routeModel.find();

  result.forEach(function (item) {
    itemMap[item._id] = item;
  });

  return itemMap;
}

export async function getAllRoutesID() {
  var routesMap: { [key: string]: any } = {};

  const result = await routeModel.find();

  result.forEach(function (route) {
    routesMap[route.routeId] = route._id;
  });

  return routesMap;
}
