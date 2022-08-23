import { socket } from "./core/socket";
import { initTracker } from "./tracker";
import { initRegisterer } from "./registerer";

export const init = () => {
    initTracker(socket);
    initRegisterer();
};

init();
