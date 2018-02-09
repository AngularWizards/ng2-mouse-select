var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Directive } from '@angular/core';
/**
 * @description
 * directive for dissalowing text-selection.
 *
 * @example
 *
 * <div noSelect></div>
 *
 * @export
 * @class NoSelectDirective
 */
let NoSelectDirective = class NoSelectDirective {
    constructor(el, renderer) {
        this.el = el;
        this.renderer = renderer;
        this.renderer.setStyle(this.el.nativeElement, '-webkit-user-select', 'none');
        this.renderer.setStyle(this.el.nativeElement, '-moz-user-select', '-moz-none');
        this.renderer.setStyle(this.el.nativeElement, '-ms-user-select', 'none');
        this.renderer.setStyle(this.el.nativeElement, 'user-select', 'none');
    }
};
NoSelectDirective = __decorate([
    Directive({
        selector: '[noSelect]',
    })
], NoSelectDirective);
export { NoSelectDirective };
