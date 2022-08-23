import { socket } from "./core/socket";

export const sendCurrentDevices = (devices: string[]) => {
    socket.emit("devices", devices);
};

export const checkDevice = (deviceId: string) =>
    new Promise(resolve => {
        socket.emit("check", deviceId, resolve);
    });
    
    
