import { socket } from "./core/socket";

export const sendCurrentDevices = (devices: string[]) => {
    socket.emit("devices", devices);
};

type RegisterResult = "success" | "override" | "fail";
export const registerDevice = (token: string, force: boolean) => (deviceId: string) =>
    new Promise<RegisterResult>(resolve => {
        socket.emit("register", { token, deviceId, force }, resolve);
    });
