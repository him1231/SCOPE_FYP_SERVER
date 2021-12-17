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
