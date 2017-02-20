import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MdToolbarModule, MdMenuModule } from '@angular/material';
//import { AppState } from './app.service';

/*
 * App Component
 * Top Level Component
 */
@Component({
    selector: 'app',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./app.component.scss'],
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    constructor(
        //public appState: AppState
    ) { }

    public ngOnInit() {
        //console.log('Initial App State', this.appState.state);
    }
}