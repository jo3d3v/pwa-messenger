import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({

    selector: 'connect-contact',
    templateUrl: 'contact.component.html',
    styleUrls: ['contact.component.scss']
})
export class ContactComponent {
    constructor(router: Router){
        this.router = router;
    }
    contacts = [
        {
            id: '001',
            name: 'Contact 1',
            type: 'MKO',
            updated: new Date('1/28/16'),
            lastMessage: 'Last message, Last message, Last message, Last message'
        },
        {
            id: '002',
            name: 'Contact 2',
            type: 'SCS',
            updated: new Date('1/17/16'),
            lastMessage: 'Last message'
        },
        {
            id: '003',
            name: 'Contact 3',
            type: 'MKO',
            updated: new Date('1/1/16'),
            lastMessage: 'Last message'
        }
    ];

    gotoMessage(id) {
        this.router.navigate(['/messages/' + id]);
    }
}