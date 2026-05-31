"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OUTPUT_DIR = exports.INPUT_DIR = void 0;
const path_1 = __importDefault(require("path"));
exports.INPUT_DIR = path_1.default.join(process.cwd(), "input");
exports.OUTPUT_DIR = path_1.default.join(process.cwd(), "output");
