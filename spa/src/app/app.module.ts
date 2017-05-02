import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { ConnectComponent } from './connect.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SourcesComponent } from './sources/sources.component';
import { MessagesComponent } from './messages/messages.component';

import { HomeComponent } from './routes/home/home.component';
import { MessageComponent } from './routes/message/message.component';
import { UserSettingsComponent } from './routes/user-settings/user-settings.component';
import { OfflineComponent } from './routes/offline/offline.component';

@NgModule({
  declarations: [
    ConnectComponent,
    HomeComponent,
    MessageComponent,
    UserSettingsComponent,
    OfflineComponent,
    NavbarComponent,
    MessagesComponent,
    SourcesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [ConnectComponent]
})
export class AppModule { }
