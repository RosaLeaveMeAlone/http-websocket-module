import { v4 as uuidv4 } from 'uuid';

export const uuidAdapter = {
    v4: () => {
        return uuidv4();
    },
}