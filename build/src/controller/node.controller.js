"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNodesHandler = exports.updateNodesHandler = void 0;
var route_service_1 = require("../service/route.service");
var routeStop_service_1 = require("../service/routeStop.service");
var stop_service_1 = require("../service/stop.service");
var geolib_1 = require("geolib");
var node_service_1 = require("../service/node.service");
var humanWalkingSpeed = 4.4; // km per hour
var normalCarSpeed = 25; //km per hour
function updateNodesHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var routes_1, routeStops_1, stops_1, nodeData_1, stopData_1, routeStopData, data, result, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    return [4 /*yield*/, (0, route_service_1.getAllRoutes)()];
                case 1:
                    routes_1 = _a.sent();
                    return [4 /*yield*/, (0, routeStop_service_1.getAllRouteStopsByKey)()];
                case 2:
                    routeStops_1 = _a.sent();
                    return [4 /*yield*/, (0, stop_service_1.getAllStops)()];
                case 3:
                    stops_1 = _a.sent();
                    nodeData_1 = {};
                    stopData_1 = Object.values(stops_1);
                    stopData_1.forEach(function (from) {
                        stopData_1.forEach(function (to) {
                            if (from.stopId !== to.stopId &&
                                (nodeData_1[from.stopId] === undefined ||
                                    nodeData_1[from.stopId][to.stopId] === undefined)) {
                                var distance = (0, geolib_1.getDistance)({ lat: from.lat, lon: from.lon }, { lat: to.lat, lon: to.lon });
                                if (distance < 500) {
                                    if (nodeData_1[from.stopId] === undefined) {
                                        nodeData_1[from.stopId] = {};
                                    }
                                    if (nodeData_1[to.stopId] === undefined) {
                                        nodeData_1[to.stopId] = {};
                                    }
                                    var time = ((distance / 1000 / humanWalkingSpeed) * 60).toFixed(2) + '01';
                                    nodeData_1[from.stopId][to.stopId] = time;
                                    nodeData_1[to.stopId][from.stopId] = time;
                                }
                            }
                        });
                    });
                    routeStopData = Object.values(routeStops_1);
                    routeStopData.forEach(function (item) {
                        var stop = stops_1[item.stop];
                        if (stop !== undefined) {
                            nodeData_1[item.key] = {};
                            if (nodeData_1[stop.stopId] === undefined) {
                                nodeData_1[stop.stopId] = {};
                            }
                            nodeData_1[stop.stopId][item.key] = '5.0001';
                            nodeData_1[item.key][stop.stopId] = '0.0001';
                            var route = routes_1[item.route];
                            if (route !== undefined) {
                                var nextKey = route.routeId + "-" + item.bound + "-" + (item.seq + 1);
                                var next = routeStops_1[nextKey];
                                if (next !== undefined) {
                                    var nextStop = stops_1[next.stop];
                                    if (nextStop !== undefined) {
                                        var distance = (0, geolib_1.getDistance)({ lat: stop.lat, lon: stop.lon }, { lat: nextStop.lat, lon: nextStop.lon });
                                        var journeyTime = ((distance / 1000 / normalCarSpeed) * 60).toFixed(2) + '01';
                                        nodeData_1[item.key][next.key] = journeyTime;
                                    }
                                    else {
                                        console.log("stops[" + next.stop + "] is undefined");
                                    }
                                }
                            }
                            else {
                                console.log("routes[" + item.route + "] is undefined");
                            }
                        }
                        else {
                            console.log("stops[" + item.stop + "] is undefined");
                        }
                    });
                    data = Object.entries(nodeData_1).map(function (_a) {
                        var key = _a[0], value = _a[1];
                        return ({
                            key: key,
                            value: value,
                        });
                    });
                    return [4 /*yield*/, (0, node_service_1.createNodes)(data)];
                case 4:
                    result = _a.sent();
                    return [2 /*return*/, res.send({ status: 'success', result: result })];
                case 5:
                    error_1 = _a.sent();
                    return [2 /*return*/, res.send({ status: 'error', error: error_1 })];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.updateNodesHandler = updateNodesHandler;
function getNodesHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var data, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, (0, node_service_1.getAllNodes)()];
                case 1:
                    data = _a.sent();
                    return [2 /*return*/, res.send({ status: 'success', data: data })];
                case 2:
                    error_2 = _a.sent();
                    return [2 /*return*/, res.send({ status: 'error', error: error_2 })];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getNodesHandler = getNodesHandler;
