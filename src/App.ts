import {Container} from 'inversify';
import {UserController} from './controllers/UserController';
import {PlaneController} from './controllers/PlaneController';
import {Controller, Types, Server} from 'ts-node-server';

const container = new Container();
container.bind<Controller>(Types.Controller).to(UserController);
container.bind<Controller>(Types.Controller).to(PlaneController);

const server = new Server({
    container: container,
    metrics: true,
    swagger: true,
    healthchecks: false,
    mongo: {}
});

server.listen(2000);