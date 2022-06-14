import {RoomManagement} from "./RoomManagement";
import {Room} from "../model/Room";

export class UserController{
    private roomManager = new RoomManagement();
    public showRoomActive() {
        this.roomManager.showRoomActive();
    }

    public rentRoom(id: number) {
        this.roomManager.changeRoomStatus(id, 2);
    }
}