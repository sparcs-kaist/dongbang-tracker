import { socket } from "./core/socket";
import { initTracker } from "./tracker";

export const init = () => {
    initTracker(socket);
    
};
