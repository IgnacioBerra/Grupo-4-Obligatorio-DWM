"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const proposalRouter_1 = __importDefault(require("./routes/proposalRouter"));
const activitiesRouter_1 = __importDefault(require("./routes/activitiesRouter"));
const loginRouter_1 = __importDefault(require("./routes/loginRouter"));
const gamesRouter_1 = __importDefault(require("./routes/gamesRouter"));
const cors = require('cors');
const app = (0, express_1.default)();
app.use(express_1.default.json()); //middleware
const PORT = 3000;
//Arreglar para especificar el puerto especifico 4200 para que tenga acceso
app.use(cors());
app.use('/api/proposal', proposalRouter_1.default);
app.use('/api/activities', activitiesRouter_1.default);
app.use('/api/login', loginRouter_1.default);
app.use('/api/games', gamesRouter_1.default);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
