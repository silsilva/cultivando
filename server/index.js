"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const cors_1 = __importDefault(require("cors"));
const jwt = __importStar(require("jsonwebtoken"));
const path = __importStar(require("path"));
const crypto = __importStar(require("crypto"));
const auth_controller_1 = require("./controllers/auth-controller");
const comercio_controller_1 = require("./controllers/comercio-controller");
const sendgrid_1 = require("./lib/sendgrid");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.use(express.json({
    limit: "50mb",
}));
function getSHA256ofString(text) {
    return crypto.createHash("sha256").update(text).digest("hex");
}
/*CUANDO HAGO UN CAMBIO TENGO QUE ACTIVAR ESTO */
// sequelize.sync({ force: true }).then((res) => {
//   console.log(res);
// });
const SECRET = "aguanteboca";
const frontEndPath = path.resolve(__dirname, "../dist");
function authMiddleware(req, res, next) {
    const token = req.headers.authorization.split(" ")[1];
    try {
        const data = jwt.verify(token, SECRET);
        req._user = data;
        next();
    }
    catch {
        res.status(401).json({ error: "middleware" });
    }
}
app.post("/auth", async (req, res) => {
    const { email, password, name } = req.body;
    const newUsers = await (0, auth_controller_1.newUser)(name, email);
    const userId = await newUsers.user.get("id");
    const passwordHasheado = getSHA256ofString(password);
    const auth = await (0, auth_controller_1.newAuth)(userId, email, passwordHasheado);
    res.json(newUsers);
});
app.post("/auth/token", async (req, res) => {
    const { email, password } = req.body;
    const passwordHasheado = getSHA256ofString(password);
    const auth = await (0, auth_controller_1.authToken)(email, passwordHasheado);
    if (auth) {
        const token = jwt.sign({ id: auth.get("user_id") }, SECRET);
        res.status(200).json({ token });
    }
    else {
        res.status(400).json({ error: "contraseña o email incorrecto" });
    }
});
app.post("/check", async (req, res) => {
    const { email } = req.body;
    const userExist = await (0, auth_controller_1.checkUser)(email);
    res.json({
        user: userExist,
    });
});
app.get("/me", authMiddleware, async (req, res) => {
    const userId = req._user.id;
    const userProfile = await (0, auth_controller_1.getUser)(userId);
    res.json(userProfile);
});
app.put("/me", authMiddleware, async (req, res) => {
    const { password } = req.body;
    const passwordHasheado = getSHA256ofString(password);
    const update = await (0, auth_controller_1.updatePassword)(req._user.id, passwordHasheado);
    res.json(update);
});
app.post("/comercio", authMiddleware, async (req, res) => {
    const { comercio, lat, lng, zone, rubro } = req.body;
    const userId = req._user.id;
    const comercios = await (0, comercio_controller_1.reportComercio)(userId, {
        zone,
        comercio,
        lat,
        lng,
        rubro,
    });
    res.json(comercios);
});
app.put("/comercio/:id", authMiddleware, async (req, res) => {
    const comercio = await (0, comercio_controller_1.modifyComercio)(req.body, req.params.id);
    res.json({ comercio });
});
app.get("/me/comercio", authMiddleware, async (req, res) => {
    const userId = req._user.id;
    const comercio = await (0, comercio_controller_1.getUserComercio)(userId);
    res.json({ comercio });
});
app.get("/comercio/:id", authMiddleware, async (req, res) => {
    const comercio = await (0, comercio_controller_1.getComercio)(req.params.id).catch((err) => {
        res.status(400).json({
            message: err,
        });
    });
    res.json(comercio);
});
app.delete("/comercio/:id", authMiddleware, async (req, res) => {
    const comercio = await (0, comercio_controller_1.deleteComercio)(req.params.id);
    res.json(comercio);
});
app.get("/comercio-around", async (req, res) => {
    const { lat, lng } = req.query;
    const lostComercio = await (0, comercio_controller_1.searchComercioAround)(lat, lng);
    res.json({ lostComercio });
});
app.post("/report", async (req, res) => {
    const { menssage } = req.body;
    const reporte = await (0, sendgrid_1.msg)(menssage);
    res.json({ reporte });
});
app.use(express.static(path.resolve(__dirname, "../dist")));
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../dist/index.html"));
});
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
