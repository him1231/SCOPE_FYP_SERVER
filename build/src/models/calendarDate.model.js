"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var calendarDateSchema = new mongoose_1.default.Schema({
    key: { type: String, unique: true },
    calendar: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Calendar' },
    date: { type: String },
    exceptionType: { type: String },
}, {
    timestamps: true,
});
var CalendarDateModel = mongoose_1.default.model('CalendarDate', calendarDateSchema);
exports.default = CalendarDateModel;
