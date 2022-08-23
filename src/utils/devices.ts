import { createHash } from "crypto";

import { ConnectType, Device, DynamicType } from "../schema";

const hash = createHash("md5");

export const filterDevices = (devices: Device[]): Device[] =>
    devices.filter(device =>
        device.connect_type !== ConnectType.WIRE
        && device.dynamic !== DynamicType.STATIC,
    );

export const hashDevices = (devices: Device[]): string[] =>
    devices.map(device => hash
        .update(device.hwaddr)
        .copy()
        .digest("base64url"),
    );
