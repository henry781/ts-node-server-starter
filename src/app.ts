import {Container} from 'inversify';
import {StellarSystemController} from './controllers/StellarSystemController';
import {Controller, Server, types} from 'ts-node-server';

const container = new Container();

container.bind<Controller>(types.Controller).to(StellarSystemController).inSingletonScope();

const server = new Server({
    container: container,
    mongo: true,
    admin: {
        auth: 'basic'
    },
    swagger: {
        servers: []
    },
    auth: {
        basic: {
            'demo': {
                password: 'password',
                roles: ['admin']
            }
        },
        jwt: {
            authorizationUrl: 'http://localhost:8080/auth/realms/master/protocol/openid-connect/auth?nonce=',
            certificate: 'MIICmzCCAYMCBgF3NTyWqjANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDDAZtYXN0ZXIwHhcNMjEwMTI0MTYyOTU5WhcNMzEwMTI0MTYzMTM5WjARMQ8wDQYDVQQDDAZtYXN0ZXIwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCdWS6+TbKy5LR0LfBXr5mbrSlxZiwbShbXmxrlku0xTwUO1L9fariV0otRB7S33rjwoTXdJHbpPdAruv0nIOuVGQzaNBaJDl5+aKLVqRF8CS4kN6KwcgBeP0hyDeXysPweTdmLoFz8rgeoYjYiDO6GlT3ppSLedgemt6ljMrhfEd2AR38ESpTzzB0tqkOqexo3offX5zB6pfU+j2rOH+aacQfhxxDm93yASZ04N4hq7rBLgUrY27tlpB+UxrkdWDqzf3gT3jiB3hHT44u7fPH5Qbd/gY6I5QVkqu6cqmaNzaiyw2DoVvRvKxq4FYSPA/cG0Pdy8Q5WQp1DWbkKqc6ZAgMBAAEwDQYJKoZIhvcNAQELBQADggEBAEaq0Ezett25R7o+UVG9zZv/LWP8mVN4FaqUPSlVYACSdzGgZo+XrOtVCSqkBw33YpF0tBtEMBY1Oo0ZEfyICa8X7tACojgg5xy5efFQF79Qi6XuprDRXv6GW062Kxdx8cT4Bw/1/z0GwlOLolqfLm8QbdGP8GmSC9ONusx5KBIo7XaneO/YZocPfEd3zbyrx/Rc2J43ycMz+LnKpLA357qqVvzcg+9hxTZ6H/3SQS95XLNt9rw2q5pffutKcbtT5Dq8jND9G3SzcC2RL9GWIcnEOuz+9l4F9KVAdfaUzyKkxVB4IHy9CaFJJT66ZfiLyhRrv3GZB1RdUB51ivqKDmA=',
            application: 'test'
        }
    }
});

server.listen();
