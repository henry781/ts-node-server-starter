import 'reflect-metadata';
import {inject} from 'inversify';
import {
    body,
    controller, getLogger,
    httpDelete,
    httpGet,
    httpPost,
    httpReply, jsonConverter,
    MongoService,
    pathParam,
    Reply,
    types,
    WebServiceError,
} from 'ts-node-server';
import {StellarSystem} from '../models/StellarSystem';
import {Planet} from "../models/Planet";

@controller('/v1/stellarSystems')
export class StellarSystemController {

    constructor(@inject(types.MongoService) private db: MongoService) {
    }

    /**
     * Create a stellar system
     */
    @httpPost({
        auth: 'jwt',
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
        reply.status(201);
    }

    /**
     * Get a stellar system
     */
    @httpGet({
        url: '/:name',
        auth: ['jwt', 'basic'],
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
            throw new WebServiceError('oups', 404);
        }

        return system;
    }

    /**
     * List stellar systems
     */
    @httpGet({
        swagger: {
            summary: 'List stellar systems',
            tags: ['Stellar Systems'],
            operationId: 'list'
        }
    })
    public async list() {
        const logger = getLogger('list', this);
        const results = await this.db.find(StellarSystem);
        logger.debug(`got <${results.length}> results`);
        return results;
    }

    /**
     * Delete a stellar system
     */
    @httpDelete({
        url: ':name',
        swagger: {
            summary: 'Remove a stellar system',
            tags: ['Stellar Systems'],
            operationId: 'remove'
        }
    })
    public async remove(@pathParam('name')name: string, @httpReply() reply: Reply) {
        await this.db.deleteOne(StellarSystem, {name: name});
        reply.status(204);
    }

    /**
     * Create a planet
     */
    @httpPost({
        url: ':stellarSystem/planets',
        auth: 'jwt',
        swagger: {
            summary: 'Create a planet',
            tags: ['Stellar Systems'],
            operationId: 'createPlanet',
            responses: {
                201: {
                    description: 'planet created successfully'
                }
            }
        }
    })
    public async createPlanet(@body() planet: Planet,
                              @pathParam('stellarSystem') stellarSystemName: string,
                              @httpReply() reply: Reply) {

        const stellarSystem = await this.db.findOne<StellarSystem>(StellarSystem, {name: stellarSystemName});

        if (!stellarSystem) {
            throw new WebServiceError('stellar system cannot be found', 404);
        }

        if (stellarSystem.planets && stellarSystem.planets.some(p => p.name === planet.name)) {
            throw new WebServiceError(`there is already a planet named <${planet.name}>`, 400);
        }

        await this.db.updateOne(StellarSystem, {name: stellarSystemName}, {$push: {planets: jsonConverter.serialize(planet)}});
        reply.status(201);
    }
}
