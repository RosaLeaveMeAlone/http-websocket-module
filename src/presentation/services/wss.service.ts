import { Server } from 'http';
import { WebSocket, WebSocketServer } from 'ws';
import { uuidAdapter } from '../../config';

interface Options {
    server: Server;
    path?: string;
}

interface HandleCommandOptions {
    command: string;
    channel?: string;
    ws: CustomWebSocket;

}

interface CustomWebSocket extends WebSocket {
    id?: string;
}


export class WssService {

    private static _instance: WssService;
    private wss: WebSocketServer;
    private channels: { [key:string]:any }  = {};
    private clientSubscriptions: { [clientId: string]: Set<string> } = {};

    private constructor( options: Options) {
        const { server, path = '/ws' } = options;
        
        this.wss = new WebSocketServer({
            server,
            path,
        });
        this.start();
    } 

    static get instance(): WssService {
        if( !WssService._instance ) {
            throw 'WssService is not initialized';
        }

        return WssService._instance;
    }
    
    static initWss( options: Options) {
        WssService._instance = new WssService(options);
    }

    public sendMessage( type: string, payload: Object) {
        this.wss.clients.forEach( client => {
            if( client.readyState === WebSocket.OPEN) {
                client.send( JSON.stringify( { type, payload } ) );
            }
        })
    }

    public sendMessageToChannel( channel: string, type: string, payload: Object) {
        if (this.channels[channel]) {
            this.channels[channel].forEach((client: CustomWebSocket) => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify({ channel, type, payload }));
                }
            });
        }
    }

    public start() {
        this.wss.on('connection', (ws: CustomWebSocket) => {

            ws.on('close', () => {
                this.unsubscribeAll(ws);
            });

            ws.on('message', (message) => {
                try {
                    const receivedData = JSON.parse(message.toString());
                    
                    const { channel, command } = receivedData;
                    
                    command && this.handleCommand({
                        command,
                        channel,
                        ws,
                    });
                } catch (error) {
                    ws.send(`error in: ${message}`);
                }

            });
        });

    }

    private handleCommand(options: HandleCommandOptions) {
        const { channel, command, ws } = options;
        switch (command) {
            case 'suscribe':
                this.suscribeCommand(channel!,ws);
                break;
            default:
                break;
        }
    }

    private suscribeCommand(channel: string, ws: CustomWebSocket) {
        if (!this.channels[channel]) {
            this.channels[channel] = [];
        }
        this.channels[channel].push(ws);

        if(!ws.id) {
            ws.id = uuidAdapter.v4();
        }

        if (!this.clientSubscriptions[ws.id]) {
            this.clientSubscriptions[ws.id] = new Set();
        }

        this.clientSubscriptions[ws.id].add(channel);
    }

    private unsubscribeAll(ws: CustomWebSocket) {
        if(ws.id && this.clientSubscriptions[ws.id]) {
            const clientChannels = this.clientSubscriptions[ws.id];
            clientChannels.forEach(channel => {
                this.channels[channel] = this.channels[channel].filter((client: CustomWebSocket) => client !== ws);
                if (this.channels[channel].length === 0) {
                    delete this.channels[channel];
                }
            });
            delete this.clientSubscriptions[ws.id];
        }
    }

}