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
exports.updateCalendarDatesHandler = void 0;
var axios_1 = __importDefault(require("axios"));
var calendarDate_service_1 = require("../service/calendarDate.service");
var calendar_service_1 = require("../service/calendar.service");
function updateCalendarDatesHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var calendars_1, API_CALENDAR_DATES_DATA, apiResult, data, result, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, (0, calendar_service_1.getAllCalendars)()];
                case 1:
                    calendars_1 = _a.sent();
                    API_CALENDAR_DATES_DATA = 'https://static.data.gov.hk/td/pt-headway-en/calendar_dates.txt';
                    return [4 /*yield*/, axios_1.default.get(API_CALENDAR_DATES_DATA)];
                case 2:
                    apiResult = _a.sent();
                    data = apiResult.data
                        .split('\r\n')
                        .map(function (item) { return item.split(','); })
                        .filter(function (values, index) { return values.length === 3 && index !== 0; })
                        .map(function (values) {
                        var _a;
                        return {
                            key: values.join('-'),
                            calendar: (_a = calendars_1.find(function (item) { return item.serviceId === values[0]; })) === null || _a === void 0 ? void 0 : _a._id,
                            date: values[1],
                            exceptionType: values[2],
                        };
                    });
                    return [4 /*yield*/, (0, calendarDate_service_1.createCalendarDates)(data)];
                case 3:
                    result = _a.sent();
                    return [2 /*return*/, res.send({ status: 'success', result: result })];
                case 4:
                    error_1 = _a.sent();
                    return [2 /*return*/, res.send({ status: 'error', error: error_1 })];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.updateCalendarDatesHandler = updateCalendarDatesHandler;
