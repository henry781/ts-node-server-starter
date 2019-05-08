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
    auth: {
        basic: {
            'demo': {
                password: 'password',
                roles: ['admin']
            }
        },
        jwt: {
            authorizationUrl: 'http://localhost:9000/auth/realms/master/protocol/openid-connect/auth?nonce=',
            certificate: '-----BEGIN CERTIFICATE-----\n' +
                'MIICmzCCAYMCBgFnmcJMEDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDDAZtYXN0ZXIwHhcNMTgxMjEwMjAxMzI2WhcNMjgxMjEwMjAxNTA2WjARMQ8wDQYDVQQDDAZtYXN0ZXIwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCC+IWX0wRGz2j2YnnrvTZKquRIRwWyLjVRNyASmrIqXfOkC/EIp7Y1KcZx7REnBP97oC1iCgIjnR1pO9rjZcuOnO+nAP9JT0lasMa2g2gxauh0Axs/9E1KTM233HAVA2EKtYWyR+b4uu9Ciu9AobMc0222pxVwxG//BRjKUTR56RyLUnSo7H0ZwBXqPRcRzBk4E/msng0ytV8aroUrQxJKWZS933DCFzG+vRWOstwTXnpGaFobpRGfzlXGmWdSFXLawmdou5h2ZrWzAu2Up/aFIvslDymyi3kBHBjv8HvxUlRA9AI8W+BflMcPstItHYF/dCUTsiZ0jMlNkzxRpcM3AgMBAAEwDQYJKoZIhvcNAQELBQADggEBAApz9kJe1BnLZLfD2ZWCjQIFn4PVnCtpZe7pJMBQ0Wu8l6zVK0gZli81NCzFhBYR46Jpgd7FMCnIiwoZqdw70nMfKE8YhkfSCUCTOMKnqkET7TX4hznGKIv0tgxJe6BVesaNAIMyWp3tb5T6srfKm8ptA/HDJcmcOtdIcLpk5rNrOLRHLfEvbToyg+YGd1tIKTwK54UjIltpTeTOHpBrZpPGdW+oa3XieQZZiBbxnGEh85uEc0wNvz3RGa7nzQS6/lePRtQ20DSF3XdpjoC41K5kCvQoS9GRpXHxLZU/0HiFu1YIAmCvK2DYzVTKG0/+iptL57zQD2+VNCdKdG7Wsq0=\n' +
                '-----END CERTIFICATE-----',
            application: 'test'
        }
    }
});

server.listen();
