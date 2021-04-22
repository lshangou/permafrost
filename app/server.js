"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("./controllers/userController");
const connection_1 = require("./database/connection");
connection_1.connectDatabase('mongodb+srv://shangou:pao123@cluster0.9k9ra.mongodb.net');
const app = express_1.default();
const port = 3000;
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
const authCheckMiddleware_1 = require("./middleware/authCheckMiddleware");
app.use(authCheckMiddleware_1.authCheckMiddleware);
app.get('/', (req, res) => {
    console.log(req.user);
    res.send('Hello World!');
});
app.post('/user/create', (req, res) => {
    userController_1.userController.create(req, res);
});
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
