import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MessengerService } from '../../messenger.service';
import { Source } from '../../model/Source';

@Component({
  selector: 'connect-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
  providers: [MessengerService]
})
export class MessageComponent implements OnInit {
  source: Source;

  constructor(
    private messengerService: MessengerService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.messengerService.source(params.id))
      .subscribe(source => this.source = source);
  }

  generateMessage() {
    this.route.params.subscribe((params: Params) => {
      this.messengerService.generateMessage(params.id);
    });
  }
}
