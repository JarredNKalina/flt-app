"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import Express and types
const express_1 = __importDefault(require("express"));
// Initialize the app
const app = (0, express_1.default)();
// Set up a route with proper type annotations
app.get('/', (req, res) => {
    res.send('Hello, World!');
});
// Set up a port for the app to listen on
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
