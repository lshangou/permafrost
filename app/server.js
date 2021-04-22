"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = express_1.default();
const port = 3000;
const authCheckMiddleware_1 = require("./middleware/authCheckMiddleware");
app.use(authCheckMiddleware_1.authCheckMiddleware);
app.get('/', (req, res) => {
    console.log(req.user);
    res.send('Hello World!');
});
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
