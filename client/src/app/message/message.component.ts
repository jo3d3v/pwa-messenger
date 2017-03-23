import {Component} from '@angular/core';

@Component({
    selector: 'connect-message',
    templateUrl: 'message.component.html',
    styleUrls: ['message.component.scss']
})
export class MessageComponent {
    messages = [
        {
            id: '001',
            title: 'Message 1',
            category: 'tachometer',
            updated: new Date(),
            message: 'Last message, Last message, Last message, Last message, Last message, Last message, Last message, Last message, Last message, Last message, Last message, Last message, Last message, Last message, Last message, Last message, Last message, Last message, Last message, Last message'
        },
        {
            id: '002',
            title: 'Message 2',
            category: 'thermometer-full',
            updated: new Date('1/17/16'),
            message: 'Last message, Last message, Last message, Last message, Last message'
        },
        {
            id: '003',
            title: 'Message 2',
            category: 'snowflake-o',
            updated: new Date('1/28/16'),
            message: 'Last message'
        }
    ];
}