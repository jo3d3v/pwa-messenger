/**
 * Interface for a source of a message. 
 */
import { IMessage } from "./IMessage";

export interface ISource {
    name: string;           // name of the source
    type: string;           // type of the source
    lastMessage?: IMessage  // the last message from this source - if available
    created: Date;          // creation date of the instance
    updated: Date;          // last update date
}