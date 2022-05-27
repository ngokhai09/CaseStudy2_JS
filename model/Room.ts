import {Value} from '../config/Value'

export class Room {
    private _id: number;
    private _numberBedrooms: number;
    private _numberToilets: number;
    private _roomStatus: number;
    private _price: number;
    private _roomName: string;


    constructor(id: number, numberBedrooms: number, numberToilets: number, roomStatus: number, price: number, roomName: string) {
        this._id = id;
        this._numberBedrooms = numberBedrooms;
        this._numberToilets = numberToilets;
        this._roomStatus = roomStatus;
        this._price = price;
        this._roomName = roomName;
    }

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get numberBedrooms(): number {
        return this._numberBedrooms;
    }

    set numberBedrooms(value: number) {
        this._numberBedrooms = value;
    }

    get numberToilets(): number {
        return this._numberToilets;
    }

    set numberToilets(value: number) {
        this._numberToilets = value;
    }

    get roomStatus(): number {
        return this._roomStatus;
    }

    set roomStatus(value: number) {
        this._roomStatus = value;
    }

    get price(): number {
        return this._price;
    }

    set price(value: number) {
        this._price = value;
    }

    get roomName(): string {
        return this._roomName;
    }

    set roomName(value: string) {
        this._roomName = value;
    }


    public toString = (): string => {
        return `${this._id},${this._numberBedrooms},${this._numberToilets},${this._roomStatus},${this._price},${this._roomName}`;
    }
}