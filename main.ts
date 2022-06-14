import * as fs from "fs";
import {Room} from "./model/Room";
import {Value} from "./config/Value";
import {IOFile} from "./controller/IOFile";
import {User} from "./model/User";
import {AccountMenu} from "./controller/menu/AccountMenu";


export class Main{
    public static user = null;
    acc = new AccountMenu();
    run(){
        while(Main.user == null){
            this.acc.selectMenu();
        }
    }
}
let main = new Main();
main.run()