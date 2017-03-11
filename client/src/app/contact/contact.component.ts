import {Component} from '@angular/core';

@Component({
    selector: 'connect-contact',
    templateUrl: 'contact.component.html',
    styleURLs: 'contact.component.html'
})
export class ContactComponent {
    contacts = [
        {
            name: 'Contact 1',
            type: 'MKO',
            updated: new Date('1/1/16'),
            lastMessage: 'Last message, Last message, Last message, Last message'
        },
        {
            name: 'Contact 1',
            type: 'SCS',
            updated: new Date('1/17/16'),
            lastMessage: 'Last message'
        },
        {
            name: 'Contact 1',
            type: 'MKO',
            updated: new Date('1/28/16'),
            lastMessage: 'Last message'
        }
    ];
}