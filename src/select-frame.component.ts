import {
    Component, ElementRef, Renderer2, QueryList, ContentChildren,
    Input, HostListener, HostBinding, Output, EventEmitter, NgZone, AfterContentInit, ViewChild
} from '@angular/core';
import { ISelectionCoordinates, ISelectFrame } from './ISelectorFrame';
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
@Component({
    selector: '[app-selectFrame]',
    styleUrls: ['./select-frame.component.css'],
    templateUrl: './select-frame.component.html'
})
export class SelectFrameComponent {
    public selectables: Array<any>;
    public hasChildren = false;
    public enabled = true;
    public selectionFrameCoordinates: ISelectionCoordinates;
    private parent: ISelectFrame;
    private children: Array<ISelectFrame>;
    private mouseDown = false;
    private mouseMoveListener: Function;
    private scrollListener: Function;
    private mouseUpListener: Function;
    private tempData: Array<any> = [];
    @Input() ensureSame: Array<string> = [];
    @Input() filter: { allowSelectElements: boolean, thisElement: boolean } = null;
    @Input() clearOnUnselected = false;
    @Input() selectClass = 'select-border';
    @Input() selectHandleClass = 'select-handle';
    @Output() data: EventEmitter<any> = new EventEmitter<Array<any>>();
    @ViewChild('selectorFrame') selector: ElementRef;
    @ContentChildren(SelectableDirective, { descendants: true }) selectableDirectives: QueryList<SelectableDirective>;

    //#region Listeners

    @HostListener('window:mousedown', ['$event'])
    private onMouseDown(ev: MouseEvent): boolean {
        if (ev.which !== 1) return;
        this.prepareStartSelection(ev);
        return this.StartSelection(ev);
    }

    private onMouseUp(ev: MouseEvent): boolean {
        if (ev.which !== 1) return;
        this.mouseDown = false;
        this.resetListeners();
        this.hideRectangle(200);
        this.tempData = this.getSelectedData();
        this.data.emit(this.tempData);
        ev.stopPropagation();
        return false;
    }
    private onMouseMove(ev: MouseEvent): void {
        if (!this.mouseDown) return;
        this.refreshMoveCoordinates(ev);
        const frame = this.getSelectorFrameCoordinates(this.selectionFrameCoordinates);
        this.drawRectangle(this.getFrameRelativeToParent(frame, this.parent));
        this.determineSelected(frame, this.selectableDirectives.toArray());
    }
    private onScroll(ev: Event) {
        if (!this.mouseDown) return;
        this.refreshScrollCoordinates();
        const frame = this.getSelectorFrameCoordinates(this.selectionFrameCoordinates);
        this.drawRectangle(this.getFrameRelativeToParent(frame, this.parent));
        this.determineSelected(frame, this.selectableDirectives.toArray());
    }

    //#endregion Listeners

    //#region ListenersControl


    private resetListeners() {
        if (this.mouseMoveListener) {
            this.mouseMoveListener();
            this.mouseMoveListener = null;
        };
        if (this.mouseUpListener) {
            this.mouseUpListener();
            this.mouseUpListener = null;
        };
        if (this.scrollListener) {
            this.scrollListener();
            this.scrollListener = null;
        };

    }

    private startListeners() {
        this.zone.runOutsideAngular(() => {
            this.scrollListener = this.renderer.listen(window, 'scroll', (scrollEvent: any) => this.onScroll(scrollEvent));
            this.mouseMoveListener = this.renderer.listen(document, 'mousemove', (dragEvent: MouseEvent) => this.onMouseMove(dragEvent));
            this.mouseUpListener = this.renderer.listen(document, 'mouseup', (mouseUpEvent: MouseEvent) => this.onMouseUp(mouseUpEvent));
        });
    }

    //#endregion ListenersControl

    //#region Coordinates

    private refreshMoveCoordinates(ev: MouseEvent): void {
        this.selectionFrameCoordinates.endX = ev.clientX;
        this.selectionFrameCoordinates.endY = ev.clientY;
    }

    private refreshScrollCoordinates(): void {
        this.selectionFrameCoordinates.endScrollX = window.scrollX;
        this.selectionFrameCoordinates.endScrollY = window.scrollY;
    }

    private setStartFrameCoordinates(ev: MouseEvent) {
        this.selectionFrameCoordinates = {
            startX: ev.clientX,
            startY: ev.clientY,
            endX: ev.clientX,
            endY: ev.clientY,
            startScrollX: window.scrollX,
            startScrollY: window.scrollY,
            endScrollX: window.scrollX,
            endScrollY: window.scrollY
        }
    }

    private determineChildrenCoordinates(): void {
        this.selectableDirectives.map(x => x.determineCoordinates());
    }

    private determineParentCoordinates(): ISelectFrame {
        return this.el.nativeElement.getBoundingClientRect();
    }

    //#endregion Coordinates

    //#region drawing

    private hideRectangle(delay?: number) {
        setTimeout(() => {
            this.renderer.setStyle(this.selector.nativeElement, 'display', 'none');
        }, delay || 0);
    }

    private drawRectangle(frame: ISelectFrame, delay?: number) {
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

    private getSelectorFrameCoordinates(data: ISelectionCoordinates): ISelectFrame {
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

    private getFrameRelativeToParent(frame: ISelectFrame, parent: ISelectFrame): ISelectFrame {
        if (parent == null) return frame;
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

    private prepareStartSelection(ev: MouseEvent) {
        // actions indepentent of allowing selection
        this.setStartCoordinates(ev);
        const frame = this.getSelectorFrameCoordinates(this.selectionFrameCoordinates);
        this.resetComponents(frame, this.selectableDirectives.toArray());
        this.resetListeners();
    }
    private StartSelection(ev: MouseEvent): boolean {
        // do nothing if start selection filter active
        // and element is not a member of the filter elements
        if (!this.allowSelectionOnElements(ev)) return;
        // new selection - clear tmpData
        this.tempData = [];
        this.mouseDown = true;
        this.startListeners();
        ev.stopPropagation();
        return false;
    }

    private setStartCoordinates(ev: MouseEvent): void {
        this.parent = this.determineParentCoordinates();
        this.determineChildrenCoordinates();
        this.setStartFrameCoordinates(ev);
    }

    private determineSelected(frame: ISelectFrame, directives: Array<SelectableDirective>): void {
        if (this.ensureSame.length === 0 || this.tempData.length === 0) this.selectComponents(frame, directives);
        else this.filterComponents(frame, directives);
        if (this.tempData.length === 0)
            this.selectableDirectives.map(x => {
                if (this.tempData.length === 0) {
                    const data = x.getDataIfSelected();
                    if (data) this.tempData.push(data);
                }
            });
    }

    private getSelectedData(): Array<any> {
        const returnData = [];
        this.selectableDirectives.map(x => {
            const data = x.getDataIfSelected();
            if (data)
                returnData.push(data);
        });
        return returnData;
    }
    private filterComponents(frame: ISelectFrame, directives: Array<SelectableDirective>): void {
        const filter = [];
        this.ensureSame.forEach((x) => {
            filter[x] = this.tempData[0][x];
        });
        this.selectableDirectives.map(x => x.select(frame, filter));
    }

    private selectComponents(frame: ISelectFrame, directives: Array<SelectableDirective>): void {
        this.selectableDirectives.map(x => x.select(frame));
    }
    private unselectComponents(directives: Array<SelectableDirective>): void {
        this.selectableDirectives.map(x => (x.select(null)));
    }

    private resetComponents(frame: ISelectFrame, directives: Array<SelectableDirective>): void {
        let i = 0;
        if (this.clearOnUnselected)
            i = this.selectableDirectives.map(x => x.clickedOnSelected(frame)).findIndex(member => member === true);
        else
            i = this.selectableDirectives.map(x => x.clicked(frame)).findIndex(member => member === true);
        if (i >= 0) return;
        this.unselectComponents(directives);
    }

    private allowSelectionOnElements(ev: MouseEvent): boolean {
        if (this.filter == null) return true;
        const element = document.elementFromPoint(ev.clientX, ev.clientY);
        let result = false;
        if (this.filter.allowSelectElements === true)
            result = (element.hasAttribute('allow-select'));
        if (this.filter.thisElement)
            result = result || (element === this.el.nativeElement);
        return result;
    }

    //#endregion selection

    constructor(public el: ElementRef, private renderer: Renderer2, private zone: NgZone) {
    }

}
