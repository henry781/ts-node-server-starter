import {collection, objectIdCustomConverter} from 'ts-node-server';
import {arrayOf, jsonObject, jsonProperty} from 'tipify';
import {Planet} from './Planet';

@collection('stellarSystems')
@jsonObject()
export class StellarSystem {

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

    @jsonProperty('planets', arrayOf(Planet))
    private _planets?: Planet[];

    public get planets(): Planet[] {
        return this._planets;
    }

    public set planets(value: Planet[]) {
        this._planets = value;
    }

    constructor(options?: { id: string, name: string, planets: Planet[] }) {
        if (options) {
            this._id = options.id;
            this._name = options.name;
            this._planets = options.planets;
        }
    }
} 
