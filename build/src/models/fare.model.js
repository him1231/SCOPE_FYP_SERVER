"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var fareSchema = new mongoose_1.default.Schema({
    fareId: { type: String, unique: true },
    price: { type: Number },
    currencyType: { type: String },
    paymentMethod: { type: String },
    transfers: { type: String },
    agency: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Agency' },
    route: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Route' },
    originStop: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Stop' },
    destinationStop: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Stop' },
}, {
    timestamps: true,
});
var FareModel = mongoose_1.default.model('Fare', fareSchema);
exports.default = FareModel;
