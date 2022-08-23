export class LogError extends Error {
    constructor(message: string) {
        console.error(message);
        super(message);
    }
}
