export class User {
    private id: string;
    private username: string;
    private password: string;
    private name: string;
    private email: string;
    private role: string;
    private date_created: Date;
    private last_login: Date;

    constructor(
        id: string,
        username: string,
        password: string,
        name: string,
        email: string,
        role: string,
        date_created: Date,
        last_login: Date
    ) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.name = name;
        this.email = email;
        this.role = role;
        this.date_created = date_created;
        this.last_login = last_login;
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
        return this.date_created;
    }

    getLastLogin(): Date {
        return this.last_login;
    }
}
