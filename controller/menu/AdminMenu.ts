import {Main} from "../../main";
import {Room} from "../../model/Room";
import {AdminController} from "../AdminController";
const prompt = require("prompt-sync")({sigint: true});
export class AdminMenu{
    private admin = new AdminController();
    public printMenu(){
        let menu: string = `
         ------------------Room-------------
        1. Show all room
        2. Find room by name
        3. Add room
        4. Edit room
        5. Delete room
        6. Change room status
        7. Log Out
        8. Exit
        --------------------------------------
        `
        console.log(menu);
    }
    public selectMenu(){
        this.printMenu();
        let n: number = 0;
        while (n > 8 || n < 1) {


            n = +(prompt("Choose your function: "));
            if (n < 1 || n > 8) {
                console.log("Please choose number between 1 and 8");
            }
        }
        switch (n) {
            case 1:
                this.admin.showAllRoom();
                break;
            case 2:
                let name = prompt("Enter room name: ")
                this.admin.findRoomByName(name);
                break;
            case 3:
                this.admin.addRoom(this.inputRoom(null));
                break;
            case 4:
                let idEdit = +(prompt("Enter room id: "));
                // console.log(idEdit);
                this.admin.editRoom(idEdit, this.inputRoom(idEdit));
                break;
            case 5:
                let idDel = +(prompt("Enter room id: "));
                console.log(idDel);
                this.admin.deleteRoom(idDel);
                break;
            case 6:
                let idChange = +(prompt("Enter room id: "));
                console.log(idChange);
                this.admin.changeRoomStatus(idChange, this.inputStatus());
                break;
            case 7:
                Main.user = null;
                return;
            case 8:
                process.exit(0);
        }

    }
    private inputRoom(idEdit) {
        console.log(" ------------------Room Input-------------");
        let isValidate: boolean = false;
        let numberBedrooms, numberToilets, roomStatus, price, roomName, id;
        while (!isValidate) {
            numberBedrooms = prompt("Enter number of bedroom:");
            numberToilets = prompt("Enter number of toilet: ");
            roomStatus = prompt("Enter room Status(1. Available/2. Rented/3. Fixing: ");
            price = prompt("Enter Price: ");
            roomName = prompt("Enter room name: ");
            if (this.validate(numberBedrooms, numberToilets, roomStatus, price, roomName)) {
                isValidate = true;
            }
        }

        if(idEdit != null){
            id = idEdit;
        }else{
            id = (this.admin.getLastId()) + 1;
        }
        return new Room(id, numberBedrooms, numberToilets, roomStatus, price, roomName)
    }
    private validate(numberBedrooms: string, numberToilets: string, roomStatus: string, price: string, roomName: string) {
        const regexNumber: RegExp = /^[0-9]+$/;
        const regex: RegExp = /^[1-3]+$/;
        if (!regexNumber.test(numberBedrooms)) {
            console.log("Number of room must be a number");
            return false;
        }
        if (!regexNumber.test(numberToilets)) {
            console.log("Number of toilet must be a number");
            return false;
        }
        if (!regex.test(roomStatus)) {
            console.log("Room status must between 1 and 3");
            return false;
        }
        if (!regexNumber.test(price)) {
            console.log("Price must be a number");
            return false;
        }
        return true;
    }
    public inputStatus():number{
        const regex: RegExp = /^[1-3]+$/;
        let roomStatus = "";
        let isOk: boolean = false;
        while(!isOk){
            roomStatus = prompt("Enter room Status(1. Available/2. Rented/3. Fixing): ");
            if(regex.test(roomStatus)){
                isOk = true;
                return +(roomStatus);
            }
        }
    }
}