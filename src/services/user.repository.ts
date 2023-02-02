import { User } from "../models/Props";

const USER = "user";

export default class UserRepository {
    setUser(user: User) {
        if (typeof window !== "undefined") {
            window.localStorage.setItem(USER, JSON.stringify(user));
        }
    }

    getUser() {
        if (typeof window !== "undefined") {
            const json = window.localStorage.getItem(USER);
            if (json) return JSON.parse(json);
        }
    }

    removeUser(): void {
        if (typeof window !== "undefined") {
            window.localStorage.removeItem(USER);
        }
    }
}
