import { Directive, ElementRef, Renderer2, Inject } from '@angular/core';
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

    constructor(@Inject(ElementRef) private el: ElementRef, @Inject(Renderer2) private renderer: Renderer2) {
        this.renderer.setAttribute(this.el.nativeElement, 'allow-select', 'true');
    }
}
