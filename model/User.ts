export class User{
    private _username: string;
    private _password: string;
    private _admin: boolean;


    constructor(username: string, password: string, admin: boolean) {
        this._username = username;
        this._password = password;
        this._admin = admin;
    }

    get username(): string {
        return this._username;
    }

    set username(value: string) {
        this._username = value;
    }

    get password(): string {
        return this._password;
    }

    set password(value: string) {
        this._password = value;
    }

    get admin(): boolean {
        return this._admin;
    }

    set admin(value: boolean) {
        this._admin = value;
    }

    public toString = (): string=>{
        return `${this._username},${this._password},${this.admin}`;
    }

}