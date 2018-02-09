var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, ContentChildren, Input, HostListener, Output, EventEmitter, ViewChild } from '@angular/core';
import { SelectableDirective } from './selectable.directive';
/**
 * @description
 * Component which defines frame for the selection area.
 *
 * Inside of it set 'selectable' directives on elements that need to be selected.
 * _______________________________
 * Inputs:
 *
 * filter - default null. { allowSelectElements: boolean, thisElement: boolean }
 *
 * clearOnUnselected - default false. If set to true, it will clear selected data
 * when clicking on
 * selectable but previously unselected items. Otherwise, it will clear selected data as
 * soon as it is clicked outside of the selectable directives.
 *
 * @export
 * @class SelectFrameComponent
 */
let SelectFrameComponent = class SelectFrameComponent {
    constructor(el, renderer, zone) {
        this.el = el;
        this.renderer = renderer;
        this.zone = zone;
        this.hasChildren = false;
        this.enabled = true;
        this.mouseDown = false;
        this.tempData = [];
        this.ensureSame = [];
        this.filter = null;
        this.clearOnUnselected = false;
        this.selectorColor = 'defaultYellow';
        this.data = new EventEmitter();
    }
    //#region Listeners
    onMouseDown(ev) {
        if (ev.which !== 1)
            return;
        ev.stopPropagation();
        if (ev.ctrlKey)
            return this.determineTypeOfContinuation(ev);
        else
            return this.startSelection(ev);
    }
    onMouseUp(ev) {
        if (ev.which !== 1)
            return;
        this.mouseDown = false;
        this.resetListeners();
        this.hideRectangle(200);
        this.tempData = this.getSelectedData();
        this.data.emit(this.tempData);
        ev.stopPropagation();
        return false;
    }
    onMouseMove(ev) {
        if (!this.mouseDown)
            return;
        this.refreshMoveCoordinates(ev);
        const frame = this.getSelectorFrameCoordinates(this.selectionFrameCoordinates);
        this.drawRectangle(this.getFrameRelativeToParent(frame, this.parent));
        this.determineSelected(frame, this.selectableDirectives.toArray());
    }
    onMouseMoveContinue(ev) {
        if (!this.mouseDown)
            return;
        this.refreshMoveCoordinates(ev);
        const frame = this.getSelectorFrameCoordinates(this.selectionFrameCoordinates);
        this.drawRectangle(this.getFrameRelativeToParent(frame, this.parent));
        this.determineSelectedContinuation(frame, this.selectableDirectives.toArray());
    }
    onScrollContinue(ev) {
        if (!this.mouseDown)
            return;
        this.refreshScrollCoordinates();
        const frame = this.getSelectorFrameCoordinates(this.selectionFrameCoordinates);
        this.drawRectangle(this.getFrameRelativeToParent(frame, this.parent));
        this.determineSelectedContinuation(frame, this.selectableDirectives.toArray());
    }
    onScroll(ev) {
        if (!this.mouseDown)
            return;
        this.refreshScrollCoordinates();
        const frame = this.getSelectorFrameCoordinates(this.selectionFrameCoordinates);
        this.drawRectangle(this.getFrameRelativeToParent(frame, this.parent));
        this.determineSelected(frame, this.selectableDirectives.toArray());
    }
    //#endregion Listeners
    //#region ListenersControl
    resetListeners() {
        if (this.mouseMoveListener) {
            this.mouseMoveListener();
            this.mouseMoveListener = null;
        }
        ;
        if (this.mouseUpListener) {
            this.mouseUpListener();
            this.mouseUpListener = null;
        }
        ;
        if (this.scrollListener) {
            this.scrollListener();
            this.scrollListener = null;
        }
        ;
    }
    startListeners() {
        this.zone.runOutsideAngular(() => {
            this.scrollListener = this.renderer.listen(window, 'scroll', (scrollEvent) => this.onScroll(scrollEvent));
            this.mouseMoveListener = this.renderer.listen(document, 'mousemove', (dragEvent) => this.onMouseMove(dragEvent));
            this.mouseUpListener = this.renderer.listen(document, 'mouseup', (mouseUpEvent) => this.onMouseUp(mouseUpEvent));
        });
    }
    startContinuationListeners() {
        this.zone.runOutsideAngular(() => {
            this.scrollListener = this.renderer.listen(window, 'scroll', (scrollEvent) => this.onScrollContinue(scrollEvent));
            this.mouseMoveListener =
                this.renderer.listen(document, 'mousemove', (dragEvent) => this.onMouseMoveContinue(dragEvent));
            this.mouseUpListener = this.renderer.listen(document, 'mouseup', (mouseUpEvent) => this.onMouseUp(mouseUpEvent));
        });
    }
    //#endregion ListenersControl
    //#region Coordinates
    refreshMoveCoordinates(ev) {
        this.selectionFrameCoordinates.endX = ev.clientX;
        this.selectionFrameCoordinates.endY = ev.clientY;
    }
    refreshScrollCoordinates() {
        this.selectionFrameCoordinates.endScrollX = window.pageXOffset;
        this.selectionFrameCoordinates.endScrollY = window.pageYOffset;
    }
    setStartFrameCoordinates(ev) {
        this.selectionFrameCoordinates = {
            startX: ev.clientX,
            startY: ev.clientY,
            endX: ev.clientX,
            endY: ev.clientY,
            startScrollX: window.pageXOffset,
            startScrollY: window.pageYOffset,
            endScrollX: window.pageXOffset,
            endScrollY: window.pageYOffset
        };
    }
    determineChildrenCoordinates() {
        this.selectableDirectives.map(x => x.determineCoordinates());
    }
    determineParentCoordinates() {
        return this.el.nativeElement.getBoundingClientRect();
    }
    //#endregion Coordinates
    //#region drawing
    hideRectangle(delay) {
        setTimeout(() => {
            this.renderer.setStyle(this.selector.nativeElement, 'display', 'none');
        }, delay || 0);
    }
    drawRectangle(frame, delay) {
        setTimeout(() => {
            this.renderer.setStyle(this.selector.nativeElement, 'display', 'block');
            this.renderer.setStyle(this.selector.nativeElement, 'left', frame.left + 'px');
            this.renderer.setStyle(this.selector.nativeElement, 'top', frame.top + 'px');
            this.renderer.setStyle(this.selector.nativeElement, 'width', frame.width + 'px');
            this.renderer.setStyle(this.selector.nativeElement, 'height', frame.height + 'px');
        }, delay || 0);
    }
    //#endregion drawing
    //#region framing
    getSelectorFrameCoordinates(data) {
        const xScroll = data.endScrollX - data.startScrollX;
        const yScroll = data.endScrollY - data.startScrollY;
        return {
            top: Math.min(data.startY, data.endY + yScroll),
            left: Math.min(data.startX, data.endX + xScroll),
            right: Math.max(data.startX, data.endX + xScroll),
            bottom: Math.max(data.startY, data.endY + yScroll),
            width: Math.abs(data.endX + xScroll - data.startX),
            height: Math.abs(data.endY + yScroll - data.startY)
        };
    }
    getFrameRelativeToParent(frame, parent) {
        if (parent == null)
            return frame;
        return {
            left: frame.left - parent.left,
            top: frame.top - parent.top,
            right: frame.right - parent.right,
            bottom: frame.bottom - parent.bottom,
            width: frame.width,
            height: frame.height
        };
    }
    //#endregion framing
    //#region selection
    startSelection(ev) {
        this.prepareStartOfSelection(ev);
        return this.doStartOfSelection(ev);
    }
    prepareStartOfSelection(ev) {
        // actions indepentent of allowing selection
        this.setStartCoordinates(ev);
        const frame = this.getSelectorFrameCoordinates(this.selectionFrameCoordinates);
        this.resetComponents(frame, this.selectableDirectives.toArray());
        this.resetListeners();
    }
    prepareContinuationOfSelection(ev) {
        this.setStartCoordinates(ev);
        this.saveSelected();
        this.resetListeners();
    }
    doStartOfSelection(ev) {
        // do nothing if start selection filter active
        // and element is not a member of the filter elements
        if (!this.allowSelectionOnElements(ev))
            return true;
        // new selection - clear tmpData
        this.tempData = [];
        this.mouseDown = true;
        this.startListeners();
        ev.stopPropagation();
        return false;
    }
    doContinuationOfSelection(ev) {
        // do nothing if start selection filter active
        // and element is not a member of the filter elements
        if (!this.allowSelectionOnElements(ev))
            return true;
        // new selection - clear tmpData
        this.mouseDown = true;
        this.startContinuationListeners();
        ev.stopPropagation();
        return false;
    }
    determineTypeOfContinuation(ev) {
        this.prepareContinuationOfSelection(ev);
        const selectedElement = this.getSelectedElement(ev);
        if (selectedElement >= 0) {
            return this.toggleThisElement(ev, selectedElement);
        }
        if (Object.keys(this.tempData).length === 0) {
            // nothing was selected till now
            return this.startSelection(ev);
        }
        return this.doContinuationOfSelection(ev);
    }
    saveSelected() {
        this.selectableDirectives.map(x => x.saveSelected());
    }
    // todo: refactoring!
    toggleThisElement(ev, index) {
        const { filter, scope } = this.getFilterAndScope();
        this.selectableDirectives.toArray()[index].toggle(filter, scope);
        this.tempData = this.getSelectedData();
        this.data.emit(this.tempData);
        ev.stopPropagation();
        return false;
    }
    getSelectedElement(ev) {
        const frame = this.getSelectorFrameCoordinates(this.selectionFrameCoordinates);
        return this.selectableDirectives.map(x => x.clicked(frame)).findIndex(member => member === true);
    }
    setStartCoordinates(ev) {
        this.parent = this.determineParentCoordinates();
        this.determineChildrenCoordinates();
        this.setStartFrameCoordinates(ev);
    }
    determineSelected(frame, directives) {
        if (this.ensureSame.length === 0 || Object.keys(this.tempData).length === 0)
            this.selectComponents(frame, directives);
        else
            this.filterComponents(frame, directives);
        if (this.tempData.length === 0)
            this.selectableDirectives.map(x => {
                if (Object.keys(this.tempData).length === 0) {
                    const data = x.getDataIfSelected();
                    if (data) {
                        if (data.scope) {
                            if (!this.tempData[data.scope])
                                this.tempData[data.scope] = [];
                            this.tempData[data.scope].push(data.data);
                        }
                        else
                            this.tempData.push(data);
                    }
                }
            });
    }
    determineSelectedContinuation(frame, directives) {
        this.filterComponents(frame, directives, true);
    }
    getSelectedData() {
        const returnData = [];
        this.selectableDirectives.map(x => {
            const data = x.getDataIfSelected();
            if (data) {
                if (data.scope) {
                    if (!returnData[data.scope])
                        returnData[data.scope] = [];
                    returnData[data.scope].push(data.data);
                }
                else
                    returnData.push(data);
            }
        });
        return returnData;
    }
    filterComponents(frame, directives, continuation) {
        const { filter, scope } = this.getFilterAndScope();
        this.selectableDirectives.map(x => x.select(frame, filter, scope, continuation));
    }
    selectComponents(frame, directives) {
        this.selectableDirectives.map(x => x.select(frame));
    }
    unselectComponents(directives) {
        this.selectableDirectives.map(x => (x.select(null)));
    }
    resetComponents(frame, directives) {
        let i = 0;
        if (this.clearOnUnselected)
            i = this.selectableDirectives.map(x => x.clickedOnSelected(frame)).findIndex(member => member === true);
        else
            i = this.selectableDirectives.map(x => x.clicked(frame)).findIndex(member => member === true);
        if (i >= 0)
            return;
        this.unselectComponents(directives);
    }
    allowSelectionOnElements(ev) {
        if (this.filter == null)
            return true;
        const element = document.elementFromPoint(ev.clientX, ev.clientY);
        let result = false;
        if (this.filter.allowSelectElements === true)
            result = (element.hasAttribute('allow-select'));
        if (this.filter.thisElement)
            result = result || (element === this.el.nativeElement);
        return result;
    }
    getFilterAndScope() {
        if (Object.keys(this.tempData).length > 0) {
            const filter = [];
            let scope = Object.keys(this.tempData)[0];
            const filterData = (+scope === 0) ? this.tempData[0] : this.tempData[scope][0];
            this.ensureSame.forEach((x) => {
                filter[x] = filterData[x];
            });
            scope = (+scope === 0) ? null : scope;
            return { filter: filter, scope: scope };
        }
        else {
            return { filter: null, scope: null };
        }
    }
    //#endregion selection
    ngAfterViewInit() {
        if (this.selectorColor === 'defaultYellow')
            this.renderer.setStyle(this.selector.nativeElement, 'background', '#fac656');
        else
            this.renderer.setStyle(this.selector.nativeElement, 'background', this.selectorColor);
    }
    ngOnChanges(changes) {
        if (changes['selectorColor'])
            this.renderer.setStyle(this.selector.nativeElement, 'background', this.selectorColor);
    }
};
__decorate([
    Input()
], SelectFrameComponent.prototype, "ensureSame", void 0);
__decorate([
    Input()
], SelectFrameComponent.prototype, "filter", void 0);
__decorate([
    Input()
], SelectFrameComponent.prototype, "clearOnUnselected", void 0);
__decorate([
    Input()
], SelectFrameComponent.prototype, "selectorColor", void 0);
__decorate([
    Output()
], SelectFrameComponent.prototype, "data", void 0);
__decorate([
    ViewChild('selectorFrame')
], SelectFrameComponent.prototype, "selector", void 0);
__decorate([
    ContentChildren(SelectableDirective, { descendants: true })
], SelectFrameComponent.prototype, "selectableDirectives", void 0);
__decorate([
    HostListener('window:mousedown', ['$event'])
], SelectFrameComponent.prototype, "onMouseDown", null);
SelectFrameComponent = __decorate([
    Component({
        selector: '[app-selectFrame]',
        styleUrls: ['./select-frame.component.css'],
        templateUrl: './select-frame.component.html'
    })
], SelectFrameComponent);
export { SelectFrameComponent };
