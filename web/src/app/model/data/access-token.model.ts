export class AccessToken {
    constructor (
        public authToken: string,
        public refreshToken: string,
    ) {}

    toJSON(): string {
        return JSON.stringify({
            authToken: this.authToken,
            refreshToken: this.refreshToken,
        });
    }

    static fromJSON(json: string): AccessToken {
        const data = JSON.parse(json);
        return new AccessToken(
            data.authToken,
            data.refreshToken,
        );
    }
}