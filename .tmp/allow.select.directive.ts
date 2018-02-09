import { Directive, ElementRef, Renderer2 } from '@angular/core';
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
@Directive({ selector: '[appAllowSelect]' })


export class AllowSelectDirective {

    constructor(private el: ElementRef, private renderer: Renderer2) {
        this.renderer.setAttribute(this.el.nativeElement, 'allow-select', 'true');
    }
}
