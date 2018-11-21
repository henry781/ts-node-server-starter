import 'reflect-metadata';
import {injectable, inject} from 'inversify';
import {
    body,
    controller,
    httpGet,
    httpPost,
    httpReply,
    MongoService,
    pathParam, Reply,
    Types,
    WebApplicationError
} from 'ts-node-server';
import {StellarSystem} from '../models/StellarSystem';

@injectable()
@controller('/v1/stellarSystems')
export class StellarSystemController {

    constructor(@inject(Types.MongoService) private db: MongoService) {
    }

    /**
     * Get a stellar system
     */
    @httpGet({
        url: '/:name',
        swagger: {
            summary: 'Get a stellar system by name',
            tags: ['Stellar Systems'],
            operationId: 'get',
            responses: {
                200: {
                    description: 'stellar system returned successfully'
                },
                404: {
                    description: 'stellar system cannot be found'
                }
            }
        }
    })
    public async get(@pathParam('name')name: string) {

        const system = await this.db.findOne(StellarSystem, {name: name});

        if (!system) {
            throw new WebApplicationError('oups', 404);
        }

        return system;
    }

    /**
     * Create a stellar system
     */
    @httpPost({
        swagger: {
            summary: 'Create a stellar system',
            tags: ['Stellar Systems'],
            operationId: 'create',
            responses: {
                201: {
                    description: 'stellar system created successfully'
                }
            }
        }
    })
    public async create(@body() stellarSystem: StellarSystem, @httpReply() reply: Reply) {

        await this.db.insertOne(stellarSystem);

        reply.status(201).send();
    }
}