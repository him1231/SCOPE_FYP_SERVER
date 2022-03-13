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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateFaresHandler = void 0;
var axios_1 = __importDefault(require("axios"));
var agency_service_1 = require("../service/agency.service");
var route_service_1 = require("../service/route.service");
var stop_service_1 = require("../service/stop.service");
var fare_service_1 = require("../service/fare.service");
function updateFaresHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var agencies_1, routes_1, stops_1, API_FARE_ATTRIBUTES_DATA, API_FARE_RULES_DATA, fareAttributesApiResult, fareRulesApiResult, dataMap_1, data, result, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 7, , 8]);
                    return [4 /*yield*/, (0, agency_service_1.getAllAgenciesID)()];
                case 1:
                    agencies_1 = _a.sent();
                    return [4 /*yield*/, (0, route_service_1.getAllRoutesID)()];
                case 2:
                    routes_1 = _a.sent();
                    return [4 /*yield*/, (0, stop_service_1.getAllStopsID)()];
                case 3:
                    stops_1 = _a.sent();
                    API_FARE_ATTRIBUTES_DATA = 'https://static.data.gov.hk/td/pt-headway-en/fare_attributes.txt';
                    API_FARE_RULES_DATA = 'https://static.data.gov.hk/td/pt-headway-en/fare_rules.txt';
                    return [4 /*yield*/, axios_1.default.get(API_FARE_ATTRIBUTES_DATA)];
                case 4:
                    fareAttributesApiResult = _a.sent();
                    return [4 /*yield*/, axios_1.default.get(API_FARE_RULES_DATA)];
                case 5:
                    fareRulesApiResult = _a.sent();
                    dataMap_1 = {};
                    fareAttributesApiResult.data
                        .split('\r\n')
                        .map(function (item) { return item.split(','); })
                        .filter(function (values, index) { return values.length === 6 && index !== 0; })
                        .forEach(function (item) {
                        dataMap_1[item[0]] = {
                            fareId: item[0],
                            price: Number(item[1]),
                            currencyType: item[2],
                            paymentMethod: item[3],
                            transfers: item[4],
                            agency: agencies_1[item[5]],
                        };
                    });
                    fareRulesApiResult.data
                        .split('\r\n')
                        .map(function (item) { return item.split(','); })
                        .filter(function (values, index) { return values.length === 4 && index !== 0; })
                        .forEach(function (item) {
                        dataMap_1[item[0]]['route'] = routes_1[item[1]];
                        dataMap_1[item[0]]['originStop'] = stops_1[item[2]];
                        dataMap_1[item[0]]['destinationStop'] = stops_1[item[3]];
                    });
                    data = Object.values(dataMap_1);
                    return [4 /*yield*/, (0, fare_service_1.createFares)(data)];
                case 6:
                    result = _a.sent();
                    return [2 /*return*/, res.send({ status: 'success', result: result })];
                case 7:
                    error_1 = _a.sent();
                    return [2 /*return*/, res.send({ status: 'error', error: error_1 })];
                case 8: return [2 /*return*/];
            }
        });
    });
}
exports.updateFaresHandler = updateFaresHandler;
