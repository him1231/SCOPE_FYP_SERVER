"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var routeSchema = new mongoose_1.default.Schema({
    routeId: { type: String, unique: true },
    agency: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Agency' },
    shortName: { type: String },
    longName: { type: String },
    type: { type: String },
    url: { type: String },
}, {
    timestamps: true,
});
var routeModel = mongoose_1.default.model('Route', routeSchema);
exports.default = routeModel;
