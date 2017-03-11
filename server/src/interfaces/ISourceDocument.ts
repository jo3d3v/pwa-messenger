import * as mongoose from 'mongoose';
import { ISource } from "../shared/ISource";

export interface ISourceDocument extends ISource, mongoose.Document { }