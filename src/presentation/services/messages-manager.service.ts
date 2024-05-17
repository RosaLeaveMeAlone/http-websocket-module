import { WssService } from './wss.service';



export class MessagesManagerService {

    constructor(
        private readonly wssService = WssService.instance,
    ) {}

    public sendMessage(type: string, payload: Object) {
        this.wssService.sendMessage(type, payload);
    }

    public sendMessageToChannel(channel: string, type: string, payload: Object) {
        this.wssService.sendMessageToChannel(channel,type,payload);
    }

}