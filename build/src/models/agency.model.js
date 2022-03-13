"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var agencySchema = new mongoose_1.default.Schema({
    key: { type: String, unique: true },
    name: { type: String },
    url: { type: String },
    timezone: { type: String },
    lang: { type: String },
}, {
    timestamps: true,
});
var AgencyModel = mongoose_1.default.model('Agency', agencySchema);
exports.default = AgencyModel;
