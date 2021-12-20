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

export async function getAllAgenciesID() {
  var AgenciesMap: { [key: string]: any } = {};

  const result = await AgencyModel.find();

  result.forEach(function (agency) {
    AgenciesMap[agency.key] = agency._id;
  });

  return AgenciesMap;
}
