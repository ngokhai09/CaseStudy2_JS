
import {User} from "../model/User";
import {IOFile} from "./IOFile";
import {Main} from "../main";
import {AdminMenu} from "./menu/AdminMenu";
import {UserMenu} from "./menu/UserMenu";

const prompt = require("prompt-sync")({sigint: true});

export class AccountController {
    private PATH = "./data/user.txt";
    private ioFile = new IOFile();
    private userList;

    constructor() {
        let line = this.ioFile.readFile(this.PATH);
        this.userList = Array();
        line.forEach((item) => {
            let str = item.split(',');
            this.userList.push(new User(str[0], str[1], str[2] === 'true'));
        })
    }

    private validate(password: string) {
        let regex = /^[A-Z]+[a-z0-9!~/)*^$&]{5,}/;
        return regex.test(password);

    }

    public login(): void {
        let isLogin: boolean = false;
        console.log("------------------Login-------------");
        let username;
        let password;

        username = prompt("Username: ");
        password = prompt("Password: ");
        this.userList.forEach(item => {
            if (item.username == username && item.password == password) {
                 Main.user = new User(username, password, item.admin);
                if (item.admin == true) {
                    let admin = new AdminMenu();
                    while(Main.user != null)
                        admin.selectMenu();
                } else {
                    let user = new UserMenu();
                    while(Main.user != null)
                        user.selectMenu();
                }
                isLogin = true;
            }
        })
        if (!isLogin) {
            console.log("Username or password is not true");
            this.login();
        }
    }

    public register(): void {
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
    }

}