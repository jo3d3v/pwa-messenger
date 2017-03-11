import { ISource } from "./ISource";

/**
 * Interface for one message.
 */
export interface IMessage {
    content: string;    // text of the message
    type: string;       // type of the message 
    created: Date;      // date of receiving the message
    source: ISource;    // the source of the message
}