import { Component, OnInit } from '@angular/core';
import { NgServiceWorker } from '@angular/service-worker';
import { MdDialog } from '@angular/material';
import { UpdateDialogComponent } from './update-dialog/update-dialog.component';

import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/filter';

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
    this.sw.checkForUpdate().subscribe();
    this.sw
      .updates
      .filter((event: any) => event.type === 'pending')
      .distinctUntilChanged((event: any) => event.version)
      .switchMap((event: any) => this.dialog.open(UpdateDialogComponent, { disableClose: true, data: { version: event.version } }).afterClosed())
      .subscribe();
  }
}
