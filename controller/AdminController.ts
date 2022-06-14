import {RoomManagement} from "./RoomManagement";
import {Room} from "../model/Room";

export class AdminController {
    private roomManager = new RoomManagement();
    public showAllRoom() {
        this.roomManager.showAllRoom();
    }
    public findRoomByName(name: string) {
        this.roomManager.findRoomByName(name);
    }

    public findRoomById(id: number): number {
        return this.roomManager.findRoomById(id);
    }

    public addRoom(room: Room) {
        this.roomManager.addRoom(room);
    }

    public editRoom(id: number, room:Room) {
        this.roomManager.editRoom(id, room);
    }

    public deleteRoom(id: number) {
        this.roomManager.deleteRoom(id);

    }

    public changeRoomStatus(id: number, status: number) {
        this.roomManager.changeRoomStatus(id, status);
    }
    public getLastId():number{
        return this.roomManager.getLastId();
    }
}