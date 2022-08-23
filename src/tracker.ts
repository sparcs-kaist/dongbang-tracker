import { fetchLanInfo } from "./wifi/api";
import { sendCurrentDevices } from "./connection";
import { filterDevices, hashDevices } from "./utils/devices";
import { Socket } from "socket.io-client";

export const initTracker = (socket: Socket) => {
    let timer: NodeJS.Timer = null;
    
    const track = () => {
        fetchLanInfo()
            .then(filterDevices)
            .then(hashDevices)
            .then(sendCurrentDevices)
            .catch(console.error);
    };
    
    socket.on("connect", () => {
        timer = setInterval(track, 5000);
    });
    
    socket.on("disconnect", () => {
        clearInterval(timer);
        timer = null;
    });
};


