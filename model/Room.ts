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

    public get id(): number {
        return this._id;
    }

    public set id(value: number) {
        this._id = value;
    }

    public get numberBedrooms(): number {
        return this._numberBedrooms;
    }

    public set numberBedrooms(value: number) {
        this._numberBedrooms = value;
    }

    public get numberToilets(): number {
        return this._numberToilets;
    }

    public set numberToilets(value: number) {
        this._numberToilets = value;
    }

    public get roomStatus(): number {
        return this._roomStatus;
    }

    public set roomStatus(value: number) {
        this._roomStatus = value;
    }

    public get price(): number {
        return this._price;
    }

    public set price(value: number) {
        this._price = value;
    }

    public get roomName(): string {
        return this._roomName;
    }

    public set roomName(value: string) {
        this._roomName = value;
    }


    public toString = (): string => {
        return `${this._id},${this._numberBedrooms},${this._numberToilets},${this._roomStatus},${this._price},${this._roomName}`;
    }
}