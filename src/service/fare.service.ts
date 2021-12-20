import FareModel, { FareInput } from '../models/fare.model';

export async function createFares(inputs: FareInput[]) {
  const result = await FareModel.bulkWrite(
    inputs.map((item) => ({
      updateOne: {
        filter: { fareId: item.fareId },
        update: { $set: item },
        upsert: true,
      },
    }))
  );

  return result;
}
