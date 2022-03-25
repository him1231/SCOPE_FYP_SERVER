import routeModel from '../models/route.model';
import routeStopModel, {RouteStopInput} from '../models/routeStop.model';

export async function createRouteStops(inputs: RouteStopInput[]) {
  const result = await routeStopModel.bulkWrite(
    inputs.map((item) => ({
      updateOne: {
        filter: {key: item.key},
        update: {$set: item},
        upsert: true,
      },
    })),
  );

  return result;
}

export async function getAllRouteStops() {
  var itemMap: {[key: string]: RouteStopInput} = {};

  const result = await routeStopModel.find();

  result.forEach(function (item) {
    itemMap[item._id] = item;
  });

  return itemMap;
}

export async function getAllRouteStopsByKey() {
  var itemMap: {[key: string]: RouteStopInput} = {};

  const result = await routeStopModel.find();

  result.forEach(function (item) {
    itemMap[item.key] = item;
  });

  return itemMap;
}

export async function getRouteStopsByRouteID(routeId: string) {
  var itemMap: {[key: string]: RouteStopInput} = {};

  var routeDbId = '';

  const routes = await routeModel.find({routeId: routeId});

  routes.forEach(function (route) {
    routeDbId = route._id;
  });

  if (routeDbId !== '') {
    const result = await routeStopModel
      .find({route: routeDbId})
      .populate('stop', 'stopId name lat lon zoneId locationType');

    result.forEach(function (item) {
      itemMap[item.key] = item;
    });
  }

  return itemMap;
}
