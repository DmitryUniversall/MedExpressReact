import { UserPrivate } from "../models/user.ts";

interface AuthData {
    user: UserPrivate;
    token: string;
}

export type {
    AuthData
}
