import StopModel, { StopInput } from '../models/stop.model';

export async function createStops(inputs: StopInput[]) {
  const result = await StopModel.bulkWrite(
    inputs.map((item) => ({
      updateOne: {
        filter: { stopId: item.stopId },
        update: { $set: item },
        upsert: true,
      },
    }))
  );

  return result;
}

export async function getAllStops() {
  var itemMap: { [key: string]: StopInput } = {};

  const result = await StopModel.find();

  result.forEach(function (item) {
    itemMap[item._id] = item;
  });

  return itemMap;
}

export async function getAllStopsID() {
  var stopsMap: { [key: string]: any } = {};

  const result = await StopModel.find();

  result.forEach(function (stop) {
    stopsMap[stop.stopId] = stop._id;
  });

  return stopsMap;
}
