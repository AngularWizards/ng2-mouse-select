var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectFrameComponent } from './select-frame.component';
import { NoSelectDirective } from './no-select.directive';
import { SelectableDirective } from './selectable.directive';
import { AllowSelectDirective } from './allow.select.directive';
export * from './select-frame.component';
export * from './no-select.directive';
export * from './selectable.directive';
export * from './allow.select.directive';
let SelectableModule = SelectableModule_1 = class SelectableModule {
    static forRoot() {
        return {
            ngModule: SelectableModule_1,
            providers: []
        };
    }
};
SelectableModule = SelectableModule_1 = __decorate([
    NgModule({
        imports: [
            CommonModule
        ],
        declarations: [
            NoSelectDirective,
            SelectFrameComponent,
            SelectableDirective,
            AllowSelectDirective
        ],
        exports: [
            NoSelectDirective,
            SelectFrameComponent,
            SelectableDirective,
            AllowSelectDirective
        ]
    })
], SelectableModule);
export { SelectableModule };
var SelectableModule_1;
