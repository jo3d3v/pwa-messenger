import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MdMenuModule } from '@angular/material';

@Component({
    selector: 'messages',
    encapsulation: ViewEncapsulation.Emulated,
    templateUrl: 'messages.component.html',
    styleUrls: ['messages.component.scss']
})

export class MessagesComponent implements OnInit, OnDestroy {
    id: number;
    private sub: any;

    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id']; // (+) converts string 'id' to a number

            // In a real app: dispatch action to load the details here.
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

}