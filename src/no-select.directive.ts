import { Directive, ElementRef, Renderer2 } from '@angular/core';
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
@Directive({
    selector: '[noSelect]',
})

export class NoSelectDirective {
    constructor(private el: ElementRef, private renderer: Renderer2) {
        this.renderer.setStyle(this.el.nativeElement, '-webkit-user-select', 'none');
        this.renderer.setStyle(this.el.nativeElement, '-moz-user-select', '-moz-none');
        this.renderer.setStyle(this.el.nativeElement, '-ms-user-select', 'none');
        this.renderer.setStyle(this.el.nativeElement, 'user-select', 'none');
    }
}
