import { fetchLanInfo } from "./wifi/api";
import { sendCurrentDevices } from "./connection";
import { filterDevices, hashDevices } from "./utils/devices";
import { Socket } from "socket.io-client";
import { pipe } from "./utils/functional";
import { config } from "./core/config";

export const initTracker = (socket: Socket) => {
    let timer: NodeJS.Timer = null;
    
    const track = () => pipe()
        .then(fetchLanInfo)
        .then(filterDevices)
        .then(hashDevices)
        .then(sendCurrentDevices)
        .catch(console.error);
    
    socket.on("connect", () => {
        timer = setInterval(track, config.interval);
    });
    
    socket.on("disconnect", () => {
        clearInterval(timer);
        timer = null;
    });
};


