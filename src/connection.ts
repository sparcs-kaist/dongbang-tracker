import { socket } from "./core/socket";

export const sendCurrentDevices = (devices: string[]) => {
    socket.emit("devices", devices);
};
