import { Router } from "express";
import { MessagesManagerController } from "./controller";


export class MessagesManagerRoutes {


    static get routes() {

        const router = Router();

        const messagesManagerController = new MessagesManagerController();

        router.get('/', messagesManagerController.home );
        router.post('/send', messagesManagerController.send );
        router.post('/sendToChannel', messagesManagerController.sendToChannel );

        return router;
    }

}