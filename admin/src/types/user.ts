import { DateTime } from "luxon"

interface IUser  {
    id: Long, 
    email: string,
    firstName: string,
    lastName: string,
    username: string,
    superUser: boolean,
    manageSupers: boolean,
    avatarId: string,
    permissions: Object | string,
    emailVerifiedAt: DateTime,
    createdAt: DateTime,
    lastLogin: DateTime | null
};


interface ILogin  {
    token: string
};

export type {
    ILogin, IUser
}

