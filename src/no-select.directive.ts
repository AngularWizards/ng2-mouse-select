import { Directive, ElementRef, Renderer2, Inject } from '@angular/core';
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
    constructor(@Inject(ElementRef) private el: ElementRef, @Inject(Renderer2) private renderer: Renderer2) {
        this.renderer.setStyle(this.el.nativeElement, '-webkit-user-select', 'none');
        this.renderer.setStyle(this.el.nativeElement, '-moz-user-select', '-moz-none');
        this.renderer.setStyle(this.el.nativeElement, '-ms-user-select', 'none');
        this.renderer.setStyle(this.el.nativeElement, 'user-select', 'none');
    }
}
