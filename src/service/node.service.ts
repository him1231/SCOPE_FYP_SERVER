import nodeModel, { NodeInput, RouteNode } from '../models/node.model';

export async function createNodes(inputs: NodeInput[]) {
  const result = await nodeModel.bulkWrite(
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

export async function getAllNodes() {
  var itemMap: { [key: string]: RouteNode } = {};

  const result = await nodeModel.find();

  result.forEach(function (item) {
    itemMap[item.key] = item.value;
  });

  return itemMap;
}
