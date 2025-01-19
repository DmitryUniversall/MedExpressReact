import { UserPrivate } from "../models/user.ts";

interface AuthTokens {
    access_token: string;
    refresh_token: string;
}

interface AuthData {
    user: UserPrivate;
    tokens: AuthTokens;
}

export type {
    AuthData,
    AuthTokens
}
