import {IOFile} from "./IOFile";
import {Room} from "../model/Room";

const prompt = require("prompt-sync")({sigint: true});

export class AdminController {
    private roomList = Array();
    private PATH = "./data/room.txt";
    private ioFile = new IOFile();

    constructor() {
        this.init();
    }

    private init() {
        let menu: string = `
         ------------------Room-------------
        1. Show all room
        2. Find room by name
        3. Add room
        4. Edit room
        5. Delete room
        6. Change room status
        7. Log Out
        --------------------------------------
        `
        console.log(menu);
        let line = this.ioFile.readFile(this.PATH);
        this.roomList = Array();
        line.forEach((item) => {
            let str = item.split(',');
            this.roomList.push(new Room(+(str[0]), +(str[1]), +(str[2]), +(str[3]), +(str[4]), str[5]));
        })
        let n: number = 0;
        while (n > 7 || n < 1) {


            n = +(prompt("Choose your function: "));
            if (n < 1 || n > 6) {
                console.log("Please choose number between 1 and 6");
            }
        }
        switch (n) {
            case 1:
                this.showAllRoom();
                break;
            case 2:


                let name = prompt("Enter room name: ")
                this.findRoomByName(name);
                break;
            case 3:
                this.addRoom();
                break;
            case 4:
                let idEdit = +(prompt("Enter room id: "));
                this.editRoom(idEdit);
                break;
            case 5:
                let idDel = +(prompt("Enter room id: "));
                this.deleteRoom(idDel);
                break;
            case 6:
                let idChange = +(prompt("Enter room id: "));
                this.changeRoomStatus(idChange);
                break;
            case 7:
                return;
        }
        this.init();
    }

    private showAllRoom() {console.table(this.roomList)

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

    private inputRoom() {
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
        id = ++this.roomList[this.roomList.length - 1].id;
        return new Room(id, numberBedrooms, numberToilets, roomStatus, price, roomName)
    }

    private findRoomByName(name: string) {
        console.log(" ------------------Room List-------------");
        let roomFind = Array();
        this.roomList.forEach(item => {
            if (item.roomName.includes(name)) {
                roomFind.push(item);
            }
        })
        console.table(roomFind);
    }

    private findRoomById(id: number): number {
        this.roomList.forEach((item, index) => {
            if (item.id == id) {
                return index;
            }
        })
        return -1;
    }

    private addRoom() {
        let room = new Room(this.inputRoom().id, this.inputRoom().numberBedrooms, this.inputRoom().numberToilets, this.inputRoom().roomStatus, this.inputRoom().price, this.inputRoom().roomName);
        this.roomList.push(room);
        this.ioFile.writeFile(this.PATH, this.roomList);
    }

    private editRoom(id: number) {
        let index: number = this.findRoomById(id);
        if (index > 0) {
            console.table(this.roomList[index]);
            this.roomList[index] = new Room(this.roomList[index].id, this.inputRoom().numberBedrooms, this.inputRoom().numberToilets, this.inputRoom().roomStatus, this.inputRoom().price, this.inputRoom().roomName);
        } else {
            console.log("Room not exist");
        }
    }

    private deleteRoom(id: number) {
        let index: number = this.findRoomById(id);
        if (index > 0) {
            console.table(this.roomList[index]);
            console.log("Do you want to delete room " + this.roomList[index].name);
            let choice = 0;
            while(choice < 1 || choice > 2){
                choice = +(prompt("1.Yes / 2.No " + this.roomList[index].name));
                if(choice < 1 || choice > 2){
                    console.log("You choose your number is 1 or 2");
                }
            }
            if(choice == 1){
                this.roomList.slice(index,  1);
                console.log()
            }

        } else {
            console.log("Room not exist");
        }
    }

    private changeRoomStatus(id: number) {
        let index: number = this.findRoomById(id);
        const regex: RegExp = /^[1-3]+$/;
        if (index > 0) {
            let roomStatus = "";
            let isOk: boolean = false;
            while(!isOk){
                roomStatus = prompt("Enter room Status(1. Available/2. Rented/3. Fixing: ");
                if(regex.test(roomStatus)){
                    isOk = true;
                    this.roomList[index].roomStatus();
                    console.log("Change status Success")
                }
            }


        } else {
            console.log("Room not exist");
        }
    }
}