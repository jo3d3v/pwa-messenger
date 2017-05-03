import { IMessage } from '../../../../server/src/shared/IMessage';
import { Source } from './Source';

export class Message implements IMessage {
    showDay: boolean;

    constructor(
        public _id: string,
        public content: string,
        public address: string,
        public type: string,
        public created: Date,
        public source: Source
    ) {}
}