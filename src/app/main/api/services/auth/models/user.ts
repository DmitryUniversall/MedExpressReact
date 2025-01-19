interface UserPublic {
    id: number;
    first_name: string;
    last_name: string;
}

interface UserPrivate extends UserPublic {
    email: string;
    created_at: string;  // TODO: Make date
}

export type {
    UserPublic,
    UserPrivate,
}
