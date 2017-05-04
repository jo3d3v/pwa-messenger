import { Component, OnInit } from '@angular/core';
import { MessengerService } from '../messenger.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Message } from '../model/Message';
import * as moment from 'moment';
import { NgServiceWorker } from '@angular/service-worker';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'connect-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
  providers: [MessengerService]
})
export class MessagesComponent implements OnInit {
  messages: Observable<Message[]>;

  constructor(
    private messengerService: MessengerService,
    private route: ActivatedRoute,
    private sw: NgServiceWorker
  ) { }

  ngOnInit() {
    this.messages = Observable.merge(
      this.route.params.map((params: Params) => params.id),
      this.sw.push.map(data => {
        return data.notification.data.id;
      })
    )
      .switchMap((id: string) => this.messengerService.messageList(id))
      .map((messages: Message[]) => {
        for (let i = 0; i < messages.length; i++) {
          if (i > 0) {
            let lastMessageDate = moment(messages[i - 1].created).startOf('day');
            let currentMessageDate = moment(messages[i].created).startOf('day');
            messages[i].showDay = lastMessageDate.diff(currentMessageDate, 'days') > 0;
          } else {
            messages[i].showDay = true;
          }
        }
        return messages;
      })
      .catch(error => {
        // TODO: add real error handling
        console.log(error);
        return Observable.of<Message[]>([]);
      });
  }
}
