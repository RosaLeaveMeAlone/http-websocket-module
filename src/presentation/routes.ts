import { Router } from 'express';
import { MessagesManagerRoutes } from './messages-manager/routes';




export class AppRoutes {


    static get routes(): Router {

        const router = Router();
        
        // Definir las rutas
        // router.use('/api/todos', /*TodoRoutes.routes */ );
        
        router.use('/api/messages-manager', MessagesManagerRoutes.routes );


        return router;
    }


}