"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var stopSchema = new mongoose_1.default.Schema({
    stopId: { type: String, unique: true },
    name: { type: String },
    lat: { type: Number },
    lon: { type: Number },
    zoneId: { type: String },
    locationType: { type: String },
    timezone: { type: String },
}, {
    timestamps: true,
});
var StopModel = mongoose_1.default.model('Stop', stopSchema);
exports.default = StopModel;
