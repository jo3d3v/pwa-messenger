import { Component, Input } from '@angular/core';
import { MdToolbarModule, MdMenuModule } from '@angular/material';

@Component({
    selector: 'ajs-navbar',
    templateUrl: 'navbar.component.html'
})
export class NavbarComponent {
    @Input() title:string;
    @Input() back:boolean = true;
}
