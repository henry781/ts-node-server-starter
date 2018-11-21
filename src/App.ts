import {Container} from 'inversify';
import {StellarSystemController} from './controllers/StellarSystemController';
import {Controller, Types, Server} from 'ts-node-server';


const container = new Container();
container.bind<Controller>(Types.Controller).to(StellarSystemController).inSingletonScope();

const server = new Server({
    container: container,
    metrics: true,
    swagger: true,
    healthcheck: true,
    mongo: {}
});

server.listen(2000);