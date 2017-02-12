/**
 * Created by Janny on 28.01.2017.
 */

// Modules
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '@angular/material';

import 'node_modules/hammerjs/hammer.js';

// Main Component
import { AppComponent }  from './app.component';
import { HomeComponent }  from './components/pages/home.component';
import { MessagesComponent }  from './components/pages/messages.component';
import { UserSettingsComponent }  from './components/pages/userSettings.component';
import { OfflineComponent } from './components/pages/offline.component';

import { routing } from './app.routing';

// Components

@NgModule({
    imports:      [
        BrowserModule,
        routing,
        MaterialModule.forRoot()
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        MessagesComponent,
        UserSettingsComponent,
        OfflineComponent
    ],
    bootstrap:    [ AppComponent ]
})
export class AppModule {}