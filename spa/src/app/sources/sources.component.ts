import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessengerService } from '../messenger.service';
import { Observable } from 'rxjs/Observable';
import { Source } from '../model/Source';

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
    private router: Router) { }

  ngOnInit() {
    this.sources = this.messageService.sourceList()
      .catch(error => {
        // TODO: add real error handling
        console.log(error);
        return Observable.of<Source[]>([]);
      });;
  }

  showMessages(source: Source): void {
    this.router.navigate([source._id, 'messages']);
  }
}
