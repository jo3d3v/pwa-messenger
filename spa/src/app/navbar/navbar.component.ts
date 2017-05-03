import { Component, Input } from '@angular/core';

@Component({
  selector: 'connect-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  @Input() title: string;
  @Input() type: string;
  @Input() back: boolean = true;
}
