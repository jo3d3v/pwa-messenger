import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessengerService } from '../messenger.service';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Source } from '../model/Source';
import { NgServiceWorker } from '@angular/service-worker';

import 'rxjs/add/observable/of';

@Component({
  selector: 'connect-sources',
  templateUrl: './sources.component.html',
  styleUrls: ['./sources.component.scss'],
  providers: [MessengerService]
})
export class SourcesComponent implements OnInit {
  sources: Observable<Source[]>;

  constructor(
    private messageService: MessengerService,
    private router: Router,
    private sw: NgServiceWorker) { }

  ngOnInit() {
    this.sources =      Observable.merge(
        new BehaviorSubject<string>(null),
        this.sw.push.map(data => data.notification.data.id)
        )
        .switchMap((id) => {
          return this.messageService.sourceList(id);
        })
        .catch(error => {
          // TODO: add real error handling
          console.log(error);
          return Observable.of<Source[]>([]);
        });;
  }

  showMessages(source: Source): void {
    this.router.navigate(['sources', source._id, 'messages']);
  }
}
