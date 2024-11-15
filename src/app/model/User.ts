export class User {
    id: string;
    username: string;
    password: string;
    name: string;
    email: string;
    role: string;
    dateCreated: Date;
    lastLogin: Date;

    constructor(
        id: string,
        username: string,
        password: string,
        name: string,
        email: string,
        role: string,
        dateCreated: Date,
        lastLogin: Date
    ) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.name = name;
        this.email = email;
        this.role = role;
        this.dateCreated = dateCreated;
        this.lastLogin = lastLogin;
    }

    // Getters
    getId(): string {
        return this.id;
    }

    getUsername(): string {
        return this.username;
    }

    getPassword(): string {
        return this.password;
    }

    getName(): string {
        return this.name;
    }

    getEmail(): string {
        return this.email;
    }

    getRole(): string {
        return this.role;
    }

    getDateCreated(): Date {
        return this.dateCreated;
    }

    getLastLogin(): Date {
        return this.lastLogin;
    }
}
