import { Component, OnInit, ViewEncapsulation } from '@angular/core';
//import { AppState } from './app.service';

/*
 * App Component
 * Top Level Component
 */
@Component({
    selector: 'app',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./app.component.scss'],
    template: `
    <div>{{halloWelt}}</div>
  `
})
export class AppComponent implements OnInit {
    public halloWelt = 'Hallo Welt!';

    constructor(
        //public appState: AppState
    ) { }

    public ngOnInit() {
        //console.log('Initial App State', this.appState.state);
    }
}