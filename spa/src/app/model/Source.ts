import { ISource } from '../../../../server/src/shared/ISource';
import { IMessage } from '../../../../server/src/shared/IMessage';

export class Source implements ISource {
    hasNew?: boolean;
    constructor(
        public _id: string,
        public name: string, 
        public type: string, 
        public lastMessage: IMessage, 
        public created: Date,
        public updated: Date) {}
}