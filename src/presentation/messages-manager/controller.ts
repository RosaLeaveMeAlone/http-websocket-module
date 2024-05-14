import { Request, Response } from "express";
import { MessagesManagerService } from '../services/messages-manager.service';


export class MessagesManagerController {
    
    constructor(
        private readonly messagesManagerService = new MessagesManagerService(),
    ) {}

    public home = (req: Request, res: Response) => {
        res.json('Messages Manager Module');
    }

    //TODO: Agregar DTO
    public send = async(req: Request, res: Response) => {
        const { type, payload } = req.body;
        this.messagesManagerService.sendMessage(type, payload);
        res.json({ type, payload });
    }


}
