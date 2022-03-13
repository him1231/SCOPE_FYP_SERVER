"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var nodeSchema = new mongoose_1.default.Schema({
    key: { type: String, unique: true },
    value: { type: Object },
}, {
    timestamps: true,
});
var nodeModel = mongoose_1.default.model('Node', nodeSchema);
exports.default = nodeModel;
