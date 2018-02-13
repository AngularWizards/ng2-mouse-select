import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'test-component',
    template: `
    <h1>{{componentTitle}}</h1>
    <div class="frame full-height" app-selectFrame
    [ensureSame]="['ShippingType','GLN']" [filter]="{ allowSelectElements: true, thisElement: true }" (data)="onData($event)">
    <div selectable
    [select]="{'Id':1,'Name':'firstName','type':'firstType'}" [selectScope]="firstScope">
    </div>
    </div>
    `
})

export class TestComponent implements OnInit {
    firstScope = 'firstScope';
    componentTitle = 'Testing the component!';
    constructor() { }

    ngOnInit() { }

    onData(ev: any) {
        return ev;
    }
}
