import 'reflect-metadata';
import {injectable} from 'inversify';
import {controller} from 'ts-node-server';

@injectable()
@controller('/v1/planes')
export class PlaneController {

}