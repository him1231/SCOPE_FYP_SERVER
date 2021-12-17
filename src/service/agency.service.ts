import AgencyModel, { AgencyInput } from '../models/agency.model';

export async function createAgencys(inputs: AgencyInput[]) {
  const agencys = await AgencyModel.bulkWrite(
    inputs.map((item) => ({
      updateOne: {
        filter: { key: item.key },
        update: { $set: item },
        upsert: true,
      },
    }))
  );

  return agencys;
}
