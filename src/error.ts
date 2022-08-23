export class GlobalError extends Error {
    constructor(message: string) {
        super();
        this.message = message;
    }
}
