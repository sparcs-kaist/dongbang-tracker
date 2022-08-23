import { Response } from "express";
import { LogError } from "../error";

export const pipe = async <T>(initialValue?: T) => initialValue;

export const error = (message: string) => { throw new LogError(message); };

export const respond = (res: Response, field: string) =>
    <T>(data: T) => res.json({ hello: "dongbang", [field]: data });

export const fetchOne = <T>(array: T[]): T =>
    array.length === 1
        ? array[0]
        : error("filter error");


export const stringifyError =
    (err: Error | unknown) => err instanceof Error
        ? err.message
        : String(err);
