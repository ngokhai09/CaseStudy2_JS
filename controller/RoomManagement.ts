import {IOFile} from "./IOFile";
import {Room} from "../model/Room";

const prompt = require("prompt-sync")({sigint: true});
export class RoomManagement{
    private roomList = Array();
    private PATH = "./data/room.txt";
    private ioFile = new IOFile();

    constructor() {
        this.init();
    }

    private init() {

        let line = this.ioFile.readFile(this.PATH);
        this.roomList = Array();
        line.forEach((item) => {
            let str = item.split(',');
            this.roomList.push(new Room(+(str[0]), +(str[1]), +(str[2]), +(str[3]), +(str[4]), str[5]));
        })
    }

    public showAllRoom() {
        console.table(this.roomList)
    }
    public showRoomActive(){
        let room = Array();
        this.roomList.forEach(item=>{
            if(item.roomStatus == 1){
                room.push(item);
            }
        })
        console.table(room);
    }
    public findRoomByName(name: string) {
        console.log(" ------------------Room List-------------");
        let roomFind = Array();
        this.roomList.forEach(item => {
            if (item.roomName.includes(name)) {
                roomFind.push(item);
            }
        })
        console.table(roomFind);
    }

    public findRoomById(id: number): number {
        let pos : number = -1;
        this.roomList.forEach((item, index) => {
            if (item.id == id) {
                pos = index;
            }
        })
        return pos;
    }

    public addRoom(room: Room) {
        this.roomList.push(room);
        this.ioFile.writeFile(this.PATH, this.roomList);
    }

    public editRoom(id: number, room:Room) {
        let index: number = this.findRoomById(id);
        if (index > -1) {
            this.roomList[index] = room;
        } else {
            console.log("Room not exist");
        }
        this.ioFile.writeFile(this.PATH, this.roomList);
    }

    public deleteRoom(id: number) {
        let index: number = this.findRoomById(id);
        if (index > -1) {
            console.table(this.roomList[index]);
            console.log("Do you want to delete room " + this.roomList[index].roomName);
            let choice = 0;
            while(choice < 1 || choice > 2){
                choice = +(prompt("1.Yes / 2.No "));
                if(choice < 1 || choice > 2){
                    console.log("You choose your number is 1 or 2");
                }
            }
            if(choice == 1){

                this.roomList.splice(index,  1);
                console.log("Delete Success")
            }

        } else {
            console.log("Room not exist");
        }
        this.ioFile.writeFile(this.PATH, this.roomList);
    }

    public changeRoomStatus(id: number, status: number) {
        let index: number = this.findRoomById(id);
        if (index > -1) {
            this.roomList[index].roomStatus = status;
            console.log("Change status success");

        } else {
            console.log("Room not exist");
        }
        this.ioFile.writeFile(this.PATH, this.roomList);
    }
    public getLastId():number{
        return this.roomList[this.roomList.length - 1].id;
    }

}