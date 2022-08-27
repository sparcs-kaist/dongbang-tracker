import express from "express";
import cors from "cors";
import ip from "ip";
import mustacheExpress from "mustache-express";

import { config } from "./core/config";

import { fetchLanInfo } from "./wifi/api";
import { filterDevices, hashDevices } from "./utils/devices";
import { filterByIp } from "./utils/ip";
import { fetchOne, pipe, respond, stringifyError } from "./utils/functional";
import { registerDevice } from "./connection";

const app = express();

app.use(cors());
app.engine("html", mustacheExpress());
app.set("view engine", "html");
app.set("views", __dirname + "/static");

app.get("/:token", (req, res) => {
    res.render("index.html", {
        token: req.params.token,
        ip: ip.address(),
        port: config.port,
    });
});

app.get("/register/:token", (req, res, next) => pipe()
    .then(fetchLanInfo)
    .then(filterDevices)
    .then(filterByIp(req.ip))
    .then(hashDevices)
    .then(fetchOne)
    .then(registerDevice(req.params.token, !!req.query.force))
    .then(respond(res, "result"))
    .catch(next),
);

app.use((err, req, res, _) => pipe(err)
    .then(stringifyError)
    .then(respond(res, "error")),
);

export const initRegisterer = () => {
    app.listen(
        config.port,
        () => console.log(`Registerer listening on port ${config.port}`),
    );
};
