import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Source } from './model/Source';
import { Message } from './model/Message';
import 'rxjs/add/operator/map';
import { BASE_URL } from './constants';

const URL = '/source';

@Injectable()
export class MessengerService {

  constructor(private http: Http) { }

  sourceList(): Observable<Source[]> {
    return this.http.get(BASE_URL + URL)
      .map(response => response.json() as Source[]);
  }

  source(sourceId: string): Observable<Source> {
    return this.http.get(BASE_URL + URL + '/' + sourceId)
      .map(response => response.json() as Source);
  }

  messageList(sourceId: string): Observable<Message[]> {
    return this.http.get(BASE_URL + URL + `/${sourceId}/message`)
      .map(response => response.json() as Message[]);
  }
}
