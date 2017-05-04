import { Component, OnInit } from '@angular/core';
import { NgServiceWorker, NgPushRegistration } from '@angular/service-worker';
import { MessengerService } from '../../messenger.service';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

const APP_SERVER_PUB_KEY = 'BLnZTN_0nQpHj_WHLdtS3ydYSkBAFF7hotoLSdZfl9-7qnh9hQuEpvxKzgiCqp_5-laBj9vJglQWmzE3ZQ1qx_w';

@Component({
  selector: 'connect-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [MessengerService]
})
export class HomeComponent implements OnInit {
  loaded: boolean;
  pushActive: boolean;
  pushLabel: Observable<string>;

  constructor(
    private sw: NgServiceWorker,
    private messengerService: MessengerService
  ) { }

  ngOnInit(): void {
    Observable.merge(
      new BehaviorSubject<boolean>(false),
      this.sw.pushRegistrationPresent()
    )
      .subscribe(result => {
        this.pushActive = result;
        this.loaded = true;
      });
  }

  togglePush() {
    if (this.loaded) {
      this.loaded = false;
      if (this.pushActive) {
        this.sw
          .registerForPush()
          // do not trigger unsubscribe on NgPushRegistration because, we use it later for resubscribe
          .switchMap((handler: NgPushRegistration) => this.messengerService.unRegisterPush({
            endpoint: handler.url,
            auth: handler.auth(),
            p256dh: handler.key()
          }))
          .subscribe(() => {
            this.pushActive = false;
            this.loaded = true;
          });
      } else {
        this.sw
          .registerForPush({
            userVisibleOnly: true,
            applicationServerKey: HomeComponent.urlBase64ToUint8Array(APP_SERVER_PUB_KEY)
          })
          .switchMap((handler: NgPushRegistration) => this.messengerService.registerPush({
            endpoint: handler.url,
            auth: handler.auth(),
            p256dh: handler.key()
          }))
          .subscribe(() => {
            this.pushActive = true;
            this.loaded = true;
          });
      }
    }
  }

  static urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }
}
