import { Request, Response } from 'express';
import { getAllRoutes } from '../service/route.service';
import { getAllRouteStopsByKey } from '../service/routeStop.service';
import { getAllStops } from '../service/stop.service';

import { getDistance } from 'geolib';
import { NodeInput } from '../models/node.model';
import { createNodes, getAllNodes } from '../service/node.service';

const humanWalkingSpeed = 4.4; // km per hour
const normalCarSpeed = 25; //km per hour

export async function updateNodesHandler(req: Request, res: Response) {
  try {
    const routes = await getAllRoutes();
    const routeStops = await getAllRouteStopsByKey();
    const stops = await getAllStops();

    const nodeData: { [key: string]: { [key: string]: string } } = {};

    const stopData = Object.values(stops);

    stopData.forEach((from) => {
      stopData.forEach((to) => {
        if (
          from.stopId !== to.stopId &&
          (nodeData[from.stopId] === undefined ||
            nodeData[from.stopId][to.stopId] === undefined)
        ) {
          const distance = getDistance(
            { lat: from.lat, lon: from.lon },
            { lat: to.lat, lon: to.lon }
          );

          if (distance < 500) {
            if (nodeData[from.stopId] === undefined) {
              nodeData[from.stopId] = {};
            }

            if (nodeData[to.stopId] === undefined) {
              nodeData[to.stopId] = {};
            }

            const time =
              ((distance / 1000 / humanWalkingSpeed) * 60).toFixed(2) + '01';

            nodeData[from.stopId][to.stopId] = time;
            nodeData[to.stopId][from.stopId] = time;
          }
        }
      });
    });

    const routeStopData = Object.values(routeStops);

    routeStopData.forEach((item) => {
      const stop = stops[item.stop];
      if (stop !== undefined) {
        nodeData[item.key] = {};

        if (nodeData[stop.stopId] === undefined) {
          nodeData[stop.stopId] = {};
        }

        nodeData[stop.stopId][item.key] = '5.0001';
        nodeData[item.key][stop.stopId] = '0.0001';

        const route = routes[item.route];

        if (route !== undefined) {
          const nextKey = `${route.routeId}-${item.bound}-${item.seq + 1}`;
          const next = routeStops[nextKey];
          if (next !== undefined) {
            const nextStop = stops[next.stop];
            if (nextStop !== undefined) {
              const distance = getDistance(
                { lat: stop.lat, lon: stop.lon },
                { lat: nextStop.lat, lon: nextStop.lon }
              );
              const journeyTime =
                ((distance / 1000 / normalCarSpeed) * 60).toFixed(2) + '01';
              nodeData[item.key][next.key] = journeyTime;
            } else {
              console.log(`stops[${next.stop}] is undefined`);
            }
          }
        } else {
          console.log(`routes[${item.route}] is undefined`);
        }
      } else {
        console.log(`stops[${item.stop}] is undefined`);
      }
    });

    const data: NodeInput[] = Object.entries(nodeData).map(([key, value]) => ({
      key,
      value,
    }));

    const result = await createNodes(data);

    return res.send({ status: 'success', result });
  } catch (error) {
    return res.send({ status: 'error', error });
  }
}

export async function getNodesHandler(req: Request, res: Response) {
  try {
    const data = await getAllNodes();
    return res.send({ status: 'success', data });
  } catch (error) {
    return res.send({ status: 'error', error });
  }
}
