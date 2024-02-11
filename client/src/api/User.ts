import {validateResponse} from "./validateResponse";

export function registerUser(username: string, email: string, password: string): Promise<void> {
    return fetch('/api/register', {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
    })
        .then(() => undefined);
}

export function loginUser(email: string, password: string): Promise<void> {
    return fetch('/api/login', {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json',
        },
        body: JSON.stringify({ email, password }),
    })
        .then(validateResponse)
        .then(() => undefined);
}
