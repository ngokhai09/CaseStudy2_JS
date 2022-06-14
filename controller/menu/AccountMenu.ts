import {User} from "../../model/User";
import {AccountController} from "../AccountController";
const prompt = require("prompt-sync")({sigint: true});
export class AccountMenu{
    acc = new AccountController();
    public printMenu(){

        let menu: string = `
        ------------------Account-------------
        1. Login
        2. Register
        3. Exit
        --------------------------------------
        `
        console.log(menu);

    }
    public selectMenu(){
        this.printMenu();
        let regex: RegExp = /^[1-3]$/;
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
                this.acc.login();
                break;
            case 2:
                this.acc.register();
                break;
            case 3:
                return;
        }
    }
}