"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var calendarSchema = new mongoose_1.default.Schema({
    serviceId: { type: String, unique: true },
    monday: { type: Boolean, default: false },
    tuesday: { type: Boolean, default: false },
    wednesday: { type: Boolean, default: false },
    thursday: { type: Boolean, default: false },
    friday: { type: Boolean, default: false },
    saturday: { type: Boolean, default: false },
    sunday: { type: Boolean, default: false },
    startDate: { type: String },
    endDate: { type: String },
}, {
    timestamps: true,
});
var CalendarModel = mongoose_1.default.model('Calendar', calendarSchema);
exports.default = CalendarModel;
