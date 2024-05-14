import { WssService } from './wss.service';



export class MessagesManagerService {

    constructor(
        private readonly wssService = WssService.instance,
    ) {}

    public sendMessage(type: String, payload: Object) {
        this.wssService.sendMessage(type, payload);
    }


}