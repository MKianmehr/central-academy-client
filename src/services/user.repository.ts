const TOKEN = 'ca-token'

export class UserRepository {

    saveToken(token: string) {
        localStorage.setItem(TOKEN, token)
    }

    getToken(): string | null {
        return localStorage.getItem(TOKEN)
    }

    removeToken() {
        return localStorage.removeItem(TOKEN)
    }
}