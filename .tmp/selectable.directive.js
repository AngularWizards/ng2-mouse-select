var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Directive, Input } from '@angular/core';
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
let SelectableDirective = class SelectableDirective {
    constructor(el, renderer) {
        this.el = el;
        this.renderer = renderer;
        this.selectedClass = 'selected';
        this.selectScope = '';
    }
    set data(value) {
        this._data = value;
    }
    get data() {
        return JSON.stringify(this._data);
    }
    // tslint:disable-next-line:no-unused-expression
    addElementClass(className) {
        this.renderer.addClass(this.el.nativeElement, className);
    }
    removeElementClass(className) {
        this.renderer.removeClass(this.el.nativeElement, className);
    }
    getDimensions() {
        return this.dimensions;
    }
    determineCoordinates() {
        this.dimensions = this.el.nativeElement.getBoundingClientRect();
    }
    clicked(selectFrame) {
        if (selectFrame == null)
            return false;
        return !((this.dimensions.left > selectFrame.right) ||
            (this.dimensions.top > selectFrame.bottom) ||
            (this.dimensions.right < selectFrame.left) ||
            (this.dimensions.bottom < selectFrame.top));
    }
    clickedOnSelected(selectFrame) {
        return this.selected && this.clicked(selectFrame);
    }
    getDataIfSelected() {
        if (!this.selected)
            return null;
        return this.getData();
    }
    saveSelected() {
        this.savedSelected = this.selected;
    }
    IsSelected() {
        return this.selected;
    }
    toggle(filter, scope, continuation) {
        if (!this.passedScope(scope))
            return;
        if (!this.passedFilter(filter))
            return;
        if (this.selected)
            return this.processUnSelect(this.selectedClass);
        else {
            return this.processSelect(this.selectedClass);
        }
    }
    select(selectFrame, filter, scope, continuation) {
        if (!continuation)
            return this.processNewSelection(selectFrame, filter, scope);
        if (!this.passedScope(scope))
            return;
        if (!this.passedFilter(filter))
            return;
        if ((this.dimensions.left > selectFrame.right) ||
            (this.dimensions.top > selectFrame.bottom) ||
            (this.dimensions.right < selectFrame.left) ||
            (this.dimensions.bottom < selectFrame.top))
            return this.processUnSelect(this.selectedClass, continuation);
        return this.processSelect(this.selectedClass);
    }
    processNewSelection(selectFrame, filter, scope) {
        if (selectFrame == null)
            return this.processUnSelect(this.selectedClass);
        if (!this.passedScope(scope))
            return this.processUnSelect(this.selectedClass);
        if (!this.passedFilter(filter))
            return this.processUnSelect(this.selectedClass);
        if ((this.dimensions.left > selectFrame.right) ||
            (this.dimensions.top > selectFrame.bottom) ||
            (this.dimensions.right < selectFrame.left) ||
            (this.dimensions.bottom < selectFrame.top))
            return this.processUnSelect(this.selectedClass);
        return this.processSelect(this.selectedClass);
    }
    processSelect(className) {
        this.selected = true;
        this.addElementClass(className);
    }
    processUnSelect(className, continuation) {
        this.selected = (continuation) ? this.savedSelected : false;
        if (!this.selected)
            this.removeElementClass(className);
    }
    passedFilter(filter) {
        if (!filter)
            return true;
        let passed = true;
        for (const name in filter) {
            if (filter[name] !== this.getData(true)[name])
                passed = false;
        }
        return passed;
    }
    passedScope(scope) {
        if (!scope)
            return true;
        return (scope === this.selectScope);
    }
    getData(intern) {
        if (this.selectScope === '' || intern)
            return JSON.parse(this.data);
        return { scope: this.selectScope, data: JSON.parse(this.data) };
    }
};
__decorate([
    Input()
], SelectableDirective.prototype, "selectedClass", void 0);
__decorate([
    Input()
], SelectableDirective.prototype, "selectScope", void 0);
__decorate([
    Input('select')
], SelectableDirective.prototype, "data", null);
SelectableDirective = __decorate([
    Directive({ selector: '[selectable]' })
], SelectableDirective);
export { SelectableDirective };
