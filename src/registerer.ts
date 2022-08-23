import express from "express";

import { fetchLanInfo } from "./wifi/api";
import { filterDevices, hashDevices } from "./utils/devices";
import { filterByIp } from "./utils/ip";
import { fetchOne, pipe, respond, stringifyError } from "./utils/functional";
import { config } from "./core/config";

const app = express();

app.get("/dongbang", (req, res, next) => pipe()
    .then(fetchLanInfo)
    .then(filterDevices)
    .then(filterByIp(req.ip))
    .then(hashDevices)
    .then(fetchOne)
    .then(respond(res, "deviceId"))
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
