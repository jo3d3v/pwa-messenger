import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Source } from './model/Source';
import { Message } from './model/Message';
import { ISerializedPushSubscription } from '../../../server/src/shared/ISerializedPushSubscription';
import 'rxjs/add/operator/map';
import { environment } from '../environments/environment';

const URL = '/source';

@Injectable()
export class MessengerService {

  constructor(private http: Http) {
  }

  sourceList(id: string): Observable<Source[]> {
    return this.http.get(environment.baseUrl + URL)
      .map(response => {
        let sources = response.json() as Source[];
        sources.forEach((source) => {
          source.hasNew = source._id === id;
        });
        return sources;
      });
  }

  source(sourceId: string): Observable<Source> {
    return this.http.get(environment.baseUrl + URL + '/' + sourceId)
      .map(response => response.json() as Source);
  }

  messageList(sourceId: string): Observable<Message[]> {
    return this.http.get(environment.baseUrl + URL + `/${sourceId}/message`)
      .map(response => response.json() as Message[]);
  }

  registerPush(subscription: ISerializedPushSubscription): Observable<Response> {
    return this.http.post(environment.baseUrl + '/push', subscription);
  }

  unRegisterPush(subscription: ISerializedPushSubscription): Observable<Response> {
    return this.http.delete(environment.baseUrl + '/push', subscription);
  }

  generateMessage(sourceId: string) {
    setTimeout(() => {
      this.http.put(environment.baseUrl + URL + `/${sourceId}/message`, {}).subscribe();
    }, 2000);
  }
}
