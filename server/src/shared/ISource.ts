/**
 * Interface for a source of a message. 
 */
export interface ISource {
    name: string;   // name of the source
    type: string;   // type of the source
    created: Date;  // creation date of the instance
    updated: Date;  // last update date
}