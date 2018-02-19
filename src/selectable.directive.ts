import { Directive, ElementRef, Renderer2, Input, Inject } from '@angular/core';
import { ISelectFrame } from './ISelectorFrame';
/**
 * @description
 *  directive for items inside the 'select-frame'
 *  component with the corresponding Select input which regulates the data sent(JSON object).
 *
 * @example
 *
 * <div selectable></div>
 *
 * [Select]="{'palletId':pallet.Id,'GLN':pallet.AmazonWarehouseGLN,'ShippingType':pallet.ShippingType}"
 * [selectedClass]='selected'
 * @export
 * @class SelectableDirective
 */
@Directive({ selector: '[selectable]' })


export class SelectableDirective {
    private dimensions: ISelectFrame;
    private _data: any;
    private selected: boolean;
    private savedSelected: boolean;
    @Input() selectedClass = 'selected';
    @Input() selectScope = '';

    @Input('select')
    public set data(value: any) {
        this._data = value;
    }
    public get data() {
        return JSON.stringify(this._data);
    }
    // tslint:disable-next-line:no-unused-expression
    private addElementClass(className: string): void {
        this.renderer.addClass(this.el.nativeElement, className);
    }
    private removeElementClass(className: string): void {
        this.renderer.removeClass(this.el.nativeElement, className);
    }
    private getDimensions(): ISelectFrame {
        return this.dimensions;
    }
    public determineCoordinates() {
        this.dimensions = this.el.nativeElement.getBoundingClientRect();
    }
    public clicked(selectFrame: ISelectFrame): boolean {

        if (selectFrame == null) return false;
        return !(
            (this.dimensions.left > selectFrame.right) ||
            (this.dimensions.top > selectFrame.bottom) ||
            (this.dimensions.right < selectFrame.left) ||
            (this.dimensions.bottom < selectFrame.top)
        );
    }
    public clickedOnSelected(selectFrame: ISelectFrame): boolean {
        return this.selected && this.clicked(selectFrame);
    }
    public getDataIfSelected(): any {
        if (!this.selected) return null;
        return this.getData();
    }
    public saveSelected(): void {
        this.savedSelected = this.selected;
    }
    public IsSelected(): boolean {
        return this.selected;
    }
    public toggle(filter?: Array<any>, scope?: string, continuation?: boolean): void {
        if (!this.passedScope(scope)) return;
        if (!this.passedFilter(filter)) return;
        if
        (this.selected)
            return this.processUnSelect(this.selectedClass);
        else {
            return this.processSelect(this.selectedClass);
        }
    }
    public select(selectFrame: ISelectFrame, filter?: Array<any>, scope?: string, continuation?: boolean): void {
        if (!continuation) return this.processNewSelection(selectFrame, filter, scope);
        if (!this.passedScope(scope)) return;
        if (!this.passedFilter(filter)) return;
        if
        (
            (this.dimensions.left > selectFrame.right) ||
            (this.dimensions.top > selectFrame.bottom) ||
            (this.dimensions.right < selectFrame.left) ||
            (this.dimensions.bottom < selectFrame.top)
        )
            return this.processUnSelect(this.selectedClass, continuation);
        return this.processSelect(this.selectedClass);
    }
    private processNewSelection(selectFrame: ISelectFrame, filter?: Array<any>, scope?: string): void {
        if (selectFrame == null) return this.processUnSelect(this.selectedClass);
        if (!this.passedScope(scope)) return this.processUnSelect(this.selectedClass);
        if (!this.passedFilter(filter)) return this.processUnSelect(this.selectedClass);
        if
        (
            (this.dimensions.left > selectFrame.right) ||
            (this.dimensions.top > selectFrame.bottom) ||
            (this.dimensions.right < selectFrame.left) ||
            (this.dimensions.bottom < selectFrame.top)
        )
            return this.processUnSelect(this.selectedClass);
        return this.processSelect(this.selectedClass);
    }
    private processSelect(className: string): any {
        this.selected = true;
        this.addElementClass(className);
    }
    private processUnSelect(className: string, continuation?: boolean): any {
        this.selected = (continuation) ? this.savedSelected : false;
        if (!this.selected)
            this.removeElementClass(className);
    }
    private passedFilter(filter?: Array<any>): boolean {
        if (!filter) return true;
        let passed = true;
        for (const name in filter) {
            if (filter[name] !== this.getData(true)[name])
                passed = false;
        }

        return passed;
    }
    private passedScope(scope?: string): any {
        if (!scope) return true;
        return (scope === this.selectScope);
    }
    private getData(intern?: boolean): any {
        if (this.selectScope === '' || intern) return JSON.parse(this.data);
        return { scope: this.selectScope, data: JSON.parse(this.data) };
    }
    constructor(@Inject(ElementRef) private el: ElementRef, @Inject(Renderer2) private renderer: Renderer2) { }
}
