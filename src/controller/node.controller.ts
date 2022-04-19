import {Request, Response} from 'express';
import {getAllRoutes} from '../service/route.service';
import {getAllRouteStopsByKey} from '../service/routeStop.service';
import {getAllStops} from '../service/stop.service';

import {getDistance} from 'geolib';
import {ICostData, NodeInput} from '../models/node.model';
import {createNodes, getAllNodes} from '../service/node.service';
import {getAllFares} from '../service/fare.service';

const humanWalkingSpeed = 4.4; // km per hour
const normalCarSpeed = 25; //km per hour

export async function updateNodesHandler(req: Request, res: Response) {
  try {
    const routes = await getAllRoutes();
    const routeStops = await getAllRouteStopsByKey();
    const stops = await getAllStops();

    const fares = await getAllFares();

    const nodeData: {[key: string]: {[key: string]: ICostData}} = {};

    const stopData = Object.values(stops);

    stopData.forEach((from) => {
      stopData.forEach((to) => {
        if (
          from.stopId !== to.stopId &&
          (nodeData[from.stopId] === undefined ||
            nodeData[from.stopId][to.stopId] === undefined)
        ) {
          const distance = getDistance(
            {lat: from.lat, lon: from.lon},
            {lat: to.lat, lon: to.lon},
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

            nodeData[from.stopId][to.stopId] = {
              walkingDistance: distance,
              travelTime: time,
              fare: 0,
            };
            nodeData[to.stopId][from.stopId] = {
              walkingDistance: distance,
              travelTime: time,
              fare: 0,
            };
          }
        }
      });
    });

    const routeStopData = Object.values(routeStops);
    const faresData = Object.values(fares);

    routeStopData.forEach((item) => {
      const stop = stops[item.stop];
      if (stop !== undefined) {
        nodeData[item.key] = {};

        if (nodeData[stop.stopId] === undefined) {
          nodeData[stop.stopId] = {};
        }

        const fare = faresData.find((data) => {
          data.fareId?.includes(item.key);
        });

        nodeData[stop.stopId][item.key] = {
          walkingDistance: 0,
          travelTime: '5.0001',
          fare: fare?.price,
        };

        nodeData[item.key][stop.stopId] = {
          walkingDistance: 0,
          travelTime: '0.0001',
          fare: 0,
        };

        const route = routes[item.route];

        if (route !== undefined) {
          const nextKey = `${route.routeId}-${item.bound}-${item.seq + 1}`;
          const next = routeStops[nextKey];
          if (next !== undefined) {
            const nextStop = stops[next.stop];
            if (nextStop !== undefined) {
              const distance = getDistance(
                {lat: stop.lat, lon: stop.lon},
                {lat: nextStop.lat, lon: nextStop.lon},
              );
              const journeyTime =
                ((distance / 1000 / normalCarSpeed) * 60).toFixed(2) + '01';
              nodeData[item.key][next.key] = {
                walkingDistance: 0,
                travelTime: journeyTime,
                fare: 0,
              };
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

    return res.send({status: 'success', result});
  } catch (error) {
    return res.send({status: 'error', error});
  }
}

export async function getNodesHandler(req: Request, res: Response) {
  try {
    const data = await getAllNodes();
    return res.send({status: 'success', data});
  } catch (error) {
    return res.send({status: 'error', error});
  }
}
