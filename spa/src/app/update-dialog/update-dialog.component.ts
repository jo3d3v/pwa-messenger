import { Component, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { NgServiceWorker } from '@angular/service-worker';

@Component({
  selector: 'connect-update-dialog',
  templateUrl: './update-dialog.component.html',
  styleUrls: ['./update-dialog.component.scss']
})
export class UpdateDialogComponent {
  constructor(
    public dialogRef: MdDialogRef<UpdateDialogComponent>,
    private sw: NgServiceWorker,
    @Inject(MD_DIALOG_DATA) private data: any) { }

  update() {
    this.sw
      .activateUpdate(this.data.version)
      .subscribe(result => {
        if (result) {
          window.location.reload();
        } else {
          this.dialogRef.close();
        }
      })
  }
}