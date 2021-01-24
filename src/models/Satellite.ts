import {jsonObject, jsonProperty} from 'tipify';
import {objectIdCustomConverter} from 'ts-node-server';

@jsonObject()
export class Satellite {

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

    constructor(options?: { id: string, name: string }) {
        if (options) {
            this._id = options.id;
            this._name = options.name;
        }
    }
}
