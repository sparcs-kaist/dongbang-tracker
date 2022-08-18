import express from "express";
import cors from "cors";

import {getMacAddress} from "./wifi";
import {parseIpAddress} from "./parser";
import {FlowError} from "./error";
import {Poller} from "./poller";
import {checkRegistered} from "./api";

const app = express();
app.use(cors({
    origin: "*",
}));
const port = process.env.PORT || 3000;


interface BaseResponse {
    hello: "dongbang";
}

interface SuccessResponse extends BaseResponse {
    macAddress: string;
}

interface ErrorResponse extends BaseResponse {
    error: string;
}

type ResponseBody = BaseResponse | SuccessResponse | ErrorResponse;

const baseResponse: BaseResponse = {hello: "dongbang"};

app.get<ResponseBody>("/dongbang", async (req, res) => {
    try {
        const ip = parseIpAddress(req.ip);
        const macAddress = await getMacAddress(ip);
        
        if (!await checkRegistered(macAddress)) {
            return res.json({...baseResponse, macAddress});
        }
    } catch (e) {
        if (e instanceof FlowError) {
            return res.json(baseResponse);
        }
        
        return res.json({
            ...baseResponse,
            error: (typeof e?.message === "string")
                ? e.message
                : "UNKNOWN_ERROR"
        });
    }
    return res.json(baseResponse);
});

const poller = new Poller();
poller.start();

app.listen(port, () =>
    console.log(`listening on port ${port}`)
);
