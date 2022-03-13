"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var routeStopSchema = new mongoose_1.default.Schema({
    key: { type: String, unique: true },
    route: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Route' },
    bound: { type: String },
    seq: { type: Number },
    stop: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Stop' },
}, {
    timestamps: true,
});
var routeStopModel = mongoose_1.default.model('RouteStop', routeStopSchema);
exports.default = routeStopModel;
