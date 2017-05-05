import { Component, OnInit } from '@angular/core';
import { NgServiceWorker } from '@angular/service-worker';
import { MdDialog } from '@angular/material';
import { UpdateDialogComponent } from './update-dialog/update-dialog.component';

import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'connect-app',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.scss']
})
export class ConnectComponent implements OnInit {

  constructor(
    private sw: NgServiceWorker,
    private dialog: MdDialog
  ) { }

  ngOnInit(): void {
    this.sw
      .updates
      .distinctUntilChanged((lastEvent, newEvent) => lastEvent.version !== newEvent.version)
      .subscribe((event: any) => {
        if (event.type === 'pending') {
          this.dialog
            .open(UpdateDialogComponent, { disableClose: true })
            .afterClosed()
            .subscribe(result => {
              this.sw.activateUpdate(event.version).subscribe();
            });
        }
      })
  }
}
