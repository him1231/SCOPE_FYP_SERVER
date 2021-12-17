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
