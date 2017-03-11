import * as http from 'http';
import * as Debug from 'debug';
import { Server } from './server';

const debug = Debug('pwa-messenger:init');

// create http server
const httpPort = normalizePort(process.env.PORT || 8080);
let app = Server.bootstrap();
app.set('port', httpPort);
const httpServer = http.createServer(app);

// listing on provided port
httpServer.listen(httpPort);

// add event handlers
httpServer.on('error', onError);
httpServer.on('listening', onListening);

/**
 * Normalize port into a number, string or false.
 * @param val input value to parse the http port from
 * @returns the port or false
 */
function normalizePort(val: number | string): number | string | boolean {
    let port: number = (typeof val === 'string') ? parseInt(val, 10) : val;

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Handler in case of an error.
 * @param the actual error
 */
function onError(error: NodeJS.ErrnoException): void {
    if (error.syscall !== 'listen') {
        throw error;
    }

    let bind = typeof httpPort === 'string'
        ? 'Pipe ' + httpPort
        : 'Port ' + httpPort;

    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Handler for listening events. This event will occur when the server starts.
 */
function onListening(): void {
    let addr = httpServer.address();
    let bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
}