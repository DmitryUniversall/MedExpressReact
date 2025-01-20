import { UserPrivate } from "../models/user.ts";

interface AuthTokenPair {
    access_token: string;
    refresh_token: string;
}

interface AuthData {
    user: UserPrivate;
    tokens: AuthTokenPair;
}

export type {
    AuthData,
    AuthTokenPair
}
