import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MdToolbarModule, MdMenuModule, MdIconModule, MdButtonModule, MdListModule, MdCardModule, MdDialogModule } from '@angular/material';
import { ServiceWorkerModule } from '@angular/service-worker';

import { AppRoutingModule } from './app-routing.module';
import { ConnectComponent } from './connect.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SourcesComponent } from './sources/sources.component';
import { MessagesComponent } from './messages/messages.component';

import { HomeComponent } from './routes/home/home.component';
import { MessageComponent } from './routes/message/message.component';
import { UserSettingsComponent } from './routes/user-settings/user-settings.component';
import { OfflineComponent } from './routes/offline/offline.component';
import { UpdateDialogComponent } from './update-dialog/update-dialog.component';

@NgModule({
  declarations: [
    ConnectComponent,
    HomeComponent,
    MessageComponent,
    UserSettingsComponent,
    OfflineComponent,
    NavbarComponent,
    MessagesComponent,
    SourcesComponent,
    UpdateDialogComponent
  ],
  entryComponents: [UpdateDialogComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MdToolbarModule,
    MdMenuModule,
    MdIconModule,
    MdButtonModule,
    MdListModule,
    MdCardModule,
    MdDialogModule,
    AppRoutingModule,
    ServiceWorkerModule
  ],
  providers: [],
  bootstrap: [ConnectComponent]
})
export class AppModule { }
