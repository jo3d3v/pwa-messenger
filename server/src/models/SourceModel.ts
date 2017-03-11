import * as mongoose from 'mongoose';
import { ISource } from "../shared/ISource";

export interface ISourceDocument extends ISource, mongoose.Document { }

export interface ISourceModel {
    list(): Promise<ISourceDocument[]>
}

/** 
 * Create the mongoose source schema and a pre-save method to set the updated-at timestamp.
 */
const schema: mongoose.Schema = new mongoose.Schema({
    name: String,
    type: String,
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    }
});

schema.pre("save", (next) => {
    this.updated = new Date();
    next();
});

schema.statics.list = () => {
    try {
        let query = Source.find();
        return query.exec();
    } catch (err) {
        return Promise.reject(err);
    }
};


/**
 * The mongoose type and model of a source.
 */
export type SourceModel = mongoose.Model<ISourceDocument> & ISourceModel;
export const Source: SourceModel = <SourceModel> mongoose.model<ISourceDocument>('Source', schema);

