import {UserController} from "../UserController";
import {Main} from "../../main";

const prompt = require("prompt-sync")({sigint: true});

export class UserMenu{
    private userController = new UserController();
    public printMenu(){
        let menu: string = `
         ------------------Room-------------
        1. Show all room active
        2. Rent room
        3. Log Out
        4. Exit
        --------------------------------------
        `
        console.log(menu);
    }
    public selectMenu(){
        this.printMenu();
        let n: number = 0;
        while (n > 4|| n < 1) {


            n = +(prompt("Choose your function: "));
            if (n < 1 || n > 4) {
                console.log("Please choose number between 1 and 4");
            }
        }
        switch (n) {
            case 1:
                this.userController.showRoomActive();
                break;
            case 2:
                this.userController.showRoomActive();
                let id = +(prompt("Enter room: "));
                this.userController.rentRoom(id)
                break;
            case 3:
                Main.user = null;
                return;
            case 4:
                process.exit(0);
        }

    }
}