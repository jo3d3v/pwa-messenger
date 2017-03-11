import * as mongoose from 'mongoose';
import { ISourceDocument } from "../interfaces/ISourceDocument";

/** 
 * Create the mongoose source schema and a pre-save method to set the updated-at timestamp.
 */
const sourceSchema: mongoose.Schema = new mongoose.Schema({
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
})
.pre("save", (next) => {
    this.updated = new Date();
    next();
});

/**
 * The mongoose model of a source.
 */
export const SourceModel: mongoose.Model<ISourceDocument> = mongoose.model<ISourceDocument>('Source', sourceSchema);

