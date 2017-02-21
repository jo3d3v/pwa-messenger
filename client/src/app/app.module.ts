import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule, ApplicationRef } from '@angular/core';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { MaterialModule } from '@angular/material';

import '../../node_modules/hammerjs/hammer.js';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from '../common/environment';
//import { ROUTES } from './app.routes';
// App is our top level component
import { AppComponent } from './app.component';
//import { APP_RESOLVER_PROVIDERS } from './app.resolver';
//import { AppState, InternalStateType } from './app.service';
//import { HomeComponent } from './home';
//import { AboutComponent } from './about';
//import { NoContentComponent } from './no-content';

// Components
import { NavbarComponent } from './navbar/navbar.component';
import { ContactComponent } from './contact/contact.component';

// Pages
import { HomeComponent } from './pages/home.component';
import { MessagesComponent } from './pages/messages.component';
import { UserSettingsComponent } from './pages/userSettings.component';
import { OfflineComponent } from './pages/offline.component';

// Routing
import { routing } from './app.routing';

//import '../styles/styles.scss';
//import '../styles/headings.css';

// Application wide providers
//const APP_PROVIDERS = [
//  ...APP_RESOLVER_PROVIDERS,
//  AppState
//];

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
    bootstrap: [AppComponent],
    declarations: [
        AppComponent,
        NavbarComponent,
        ContactComponent,
        HomeComponent,
        MessagesComponent,
        UserSettingsComponent,
        OfflineComponent
        //AboutComponent,
        //HomeComponent,
        //NoContentComponent
    ],
    imports: [ // import Angular's modules
        BrowserModule,
        FormsModule,
        HttpModule,
        MaterialModule.forRoot(),
        routing
        //RouterModule.forRoot(ROUTES, { useHash: true, preloadingStrategy: PreloadAllModules })
    ],
    providers: [ // expose our Services and Providers into Angular's dependency injection
        ENV_PROVIDERS,
        //APP_PROVIDERS
    ]
})
export class AppModule {

    constructor(
        public appRef: ApplicationRef,
        //public appState: AppState
    ) { }
}