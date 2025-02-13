import { UserPrivate } from "./user.ts";
import { AuthTokenPair } from "./auth_token_pair.ts";

export interface AuthData {
    user: UserPrivate;
    tokens: AuthTokenPair;
}
