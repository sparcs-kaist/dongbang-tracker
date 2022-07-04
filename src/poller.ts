import {ConnectType, getConnectedDevices} from "./wifi";

export class Poller {
    interval: number;
    timer: NodeJS.Timer;
    prevDevices: Set<string>;
    
    constructor(interval?: number) {
        this.interval = interval || 3000;
        this.prevDevices = new Set([]);
    }
    
    start() {
        this.timer = setInterval(
            () => this.poll().catch(console.error),
            this.interval
        );
    }
    
    stop() {
        clearInterval(this.timer);
    }
    
    private async poll() {
        const devices = await this.getDeviceSet();
        const {entered, exited} = this.getDiff(devices);
        this.prevDevices = devices;
        
        entered.forEach(mac => console.log(`Entered: ${mac}`));
        exited.forEach(mac => console.log(`Exited: ${mac}`));
    }
    
    private async getDeviceSet(): Promise<Set<string>> {
        return new Set((await getConnectedDevices())
            .filter(device => device.connect_type === ConnectType.WIRELESS)
            .map(device => device.hwaddr)
        );
    }
    
    private getDiff(devices: Set<string>): {entered: string[], exited: string[]} {
        const entered = diff(devices, this.prevDevices);
        const exited = diff(this.prevDevices, devices);
    
        return {entered, exited};
    }
}

const diff = (set1: Set<string>, set2: Set<string>): string[] => (
    [...set1].filter(item => !set2.has(item))
);
