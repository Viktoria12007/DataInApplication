import {validateResponse} from "./validateResponse";
import {z} from "zod";

const UserSchema = z.object({
    id: z.string(),
    email: z.string(),
    username: z.string(),
});
type User = z.infer<typeof UserSchema>;

type RegisterUser = {
    username: string,
    email: string,
    password: string,
}

export function registerUser(user: RegisterUser): Promise<void> {
    return fetch('/api/register', {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json',
        },
        body: JSON.stringify(user),
    })
        .then(validateResponse)
        .then(() => undefined);
}

type LoginUser = {
    username: string,
    email: string,
    password: string,
}

export function loginUser(user: LoginUser): Promise<void> {
    return fetch('/api/login', {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json',
        },
        body: JSON.stringify(user),
    })
        .then(validateResponse)
        .then(() => undefined);
}

export function logoutUser(): Promise<void> {
    return fetch('/api/logout', {
        method: 'POST',
    })
        .then(validateResponse)
        .then(() => undefined);
}

export function fetchMe(): Promise<User> {
    return fetch('api/users/me')
        .then(validateResponse)
        .then((response) => response.json())
        .then((data) => UserSchema.parse(data));
}
