import { Component, OnInit } from '@angular/core';
import { MessengerService } from '../messenger.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Message } from '../model/Message';
import * as moment from 'moment';

import 'rxjs/add/observable/of';
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
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.messages = this.route.params
      .switchMap((params: Params) => this.messengerService.messageList(params.id))
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
