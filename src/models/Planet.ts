import {arrayOf, jsonObject, jsonProperty} from 'tipify';
import {Satellite} from './Satellite';
import {objectIdCustomConverter} from 'ts-node-server';

@jsonObject()
export class Planet {

    @jsonProperty('_id', objectIdCustomConverter)
    private _id?: string;

    public get id(): string {
        return this._id;
    }

    public set id(value: string) {
        this._id = value;
    }

    @jsonProperty('name', String)
    private _name?: string;

    public get name(): string {
        return this._name;
    }

    public set name(value: string) {
        this._name = value;
    }

    @jsonProperty('mass', Number)
    private _mass?: number;

    public get mass(): number {
        return this._mass;
    }

    public set mass(value: number) {
        this._mass = value;
    }

    @jsonProperty('dateOfDiscovery', Date)
    private _dateOfDiscovery?: Date;

    public get dateOfDiscovery(): Date {
        return this._dateOfDiscovery;
    }

    public set dateOfDiscovery(value: Date) {
        this._dateOfDiscovery = value;
    }

    @jsonProperty('satellites', arrayOf(Satellite))
    private _satellites: Satellite[];

    public get satellites(): Satellite[] {
        return this._satellites;
    }

    public set satellites(value: Satellite[]) {
        this._satellites = value;
    }

    constructor(options?: { id: string, name: string, mass: number, dateOfDiscovery: Date, satellites: Satellite[] }) {
        if (options) {
            this._id = options.id;
            this._name = options.name;
            this._mass = options.mass;
            this._dateOfDiscovery = options.dateOfDiscovery;
            this._satellites = options.satellites;
        }
    }
}
