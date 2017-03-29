import * as mongoose from 'mongoose';
import { ISource } from "../shared/ISource";
import { Message } from "./MessageModel";

export interface ISourceDocument extends ISource, mongoose.Document { }

export interface ISourceModel {
    /**
     * List all sources including their last message - sorted by its updated-timestamp descending.
     * @return Promise that provides an array of {@link ISourceDocument}.
     */
    list(): Promise<ISourceDocument[]>
}

/** 
 * Create the mongoose source schema and a pre-save method to set the updated-at timestamp.
 */
const schema: mongoose.Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    lastMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    },
    created: {
        type: Date,
        default: Date.now,
        required: true
    },
    updated: {
        type: Date,
        default: Date.now,
        required: true
    }
});

/**
 * Updated-timestamp should be renewed each time a {@link Source} is saved.
 */
schema.pre("save", (next) => {
    this.updated = new Date();
    next();
});

/**
 * List all sources including their last message - sorted by its updated-timestamp descending.
 * @return Promise that provides an array of {@link ISourceDocument}.
 * @static
 */
schema.statics.list = (): Promise<ISourceDocument[]> => {
    try {
        return Source.find({})
            .populate('lastMessage')
            .sort('-updated')
            .exec();
    } catch (err) {
        return Promise.reject(err);
    }
};

/**
 * The mongoose type and model of a source.
 */
export type SourceModel = mongoose.Model<ISourceDocument> & ISourceModel;
export const Source: SourceModel = <SourceModel>mongoose.model<ISourceDocument>('Source', schema);

