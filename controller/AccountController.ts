import {IOFile} from "./IOFile";
import {User} from "../model/User";
import {AdminController} from "./AdminController";
import {UserController} from "./UserController";

const prompt = require("prompt-sync")({sigint: true});

export class AccountController {
    private PATH = "./data/user.txt";
    private ioFile = new IOFile();
    private userList = Array();

    constructor() {
        this.init();
    }

    private init(): void {
        let regex: RegExp = /^[1-3]$/;
        let menu: string = `
        ------------------Account-------------
        1. Login
        2. Register
        3. Exit
        --------------------------------------
        `
        console.log(menu);
        let line = this.ioFile.readFile(this.PATH);
        this.userList = Array();
        line.forEach((item) => {
            let str = item.split(',');
            this.userList.push(new User(str[0], str[1], str[2] === 'true'));
        })
        let n: number = 0;
        while (n > 3 || n < 1) {
            let str = prompt("Choose your function: ");
            if (regex.test(str)) {
                n = +(str);
            } else {
                n = 0;
            }
            if (n < 1 || n > 3) {
                console.log("Please choose number between 1 and 3");
            }
        }
        switch (n) {
            case 1:
                this.login();
                break;
            case 2:
                this.register();
                break;
            case 3:
                return;
        }
    }

    private validate(password: string) {
        let regex = /^[A-Z]+[a-z0-9!~/)*^$&]{5,}/;
        return regex.test(password);

    }

    private login(): void {
        let isLogin: boolean = false;
        console.log("------------------Login-------------");
        let username;
        let password;

        username = prompt("Username: ");
        password = prompt("Password: ");
        this.userList.forEach(item => {
            if (item.username == username && item.password == password) {
                if (item.admin == true) {
                    let amdin = new AdminController();
                    this.init();
                } else {
                    let user = new UserController();
                    this.init();
                }
                isLogin = true;
            }
        })
        if (!isLogin) {
            console.log("Username or password is not true");
            this.login();
        }
    }

    private register(): void {
        console.log("------------------Register-------------");
        let username;
        let password;
        while (true) {
            let str = "Register Success";
            username = prompt("Username: ");
            password = prompt("Password: ");
            this.userList.forEach(item => {
                if (username == item.username) {
                    str = "Username is already exist.";
                }
            })
            if (str == "Register Success") {
                if (!this.validate(password)) {
                    str = "Password must has at least 6 character and has at least one special character like !,~,/,),*,^,$,&"
                    console.log(str);
                } else {
                    console.log(str);
                    break;
                }
            }
            else{
                console.log(str);
            }
        }

        this.userList.push(new User(username, password, false));
        this.ioFile.writeFile(this.PATH, this.userList);
        this.init()
    }
}