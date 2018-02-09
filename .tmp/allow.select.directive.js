var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Directive } from '@angular/core';
/**
 * @description
 * directive for items inside the 'select-frame' * component.
 *
 * Start of selection is allowed on elements with these directive,
 * if filter on  'select-frame' component is set on
 * 'allowSelectElements'.
 *
 *
 * @example
 *
 * <div appAllowSelect></div>
 *
 * @export
 * @class AllowSelectDirective
 */
let AllowSelectDirective = class AllowSelectDirective {
    constructor(el, renderer) {
        this.el = el;
        this.renderer = renderer;
        this.renderer.setAttribute(this.el.nativeElement, 'allow-select', 'true');
    }
};
AllowSelectDirective = __decorate([
    Directive({ selector: '[appAllowSelect]' })
], AllowSelectDirective);
export { AllowSelectDirective };
