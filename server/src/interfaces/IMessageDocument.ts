import * as mongoose from 'mongoose';
import { IMessage } from "../shared/IMessage";

export interface IMessageDocument extends IMessage, mongoose.Document { }