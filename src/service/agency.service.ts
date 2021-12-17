import AgencyModel, { AgencyInput } from '../models/agency.model';

export async function createAgencies(inputs: AgencyInput[]) {
  const result = await AgencyModel.bulkWrite(
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

export async function getAllAgencies() {
  const result = await AgencyModel.find();
  return result;
}
