import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TestComponent } from './test-component';
import { SelectableDirective, SelectableModule, SelectFrameComponent } from '../src/index';
import { ComponentFixtureAutoDetect } from '@angular/core/testing';

describe('TestComponent', () => {

  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let debugElement: DebugElement;
  let htmlElement: HTMLElement;
  let h1Element: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, SelectFrameComponent, SelectableDirective],
      providers: [
        { provide: ComponentFixtureAutoDetect, useValue: true }
      ]
    });
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    htmlElement = debugElement.query(By.directive(SelectableDirective)).nativeElement;
    h1Element = debugElement.query(By.css('h1')).nativeElement;
  });
  it('component has title', () => {
    // fixture.detectChanges();
    expect(h1Element.title).toEqual('Testing the component!');
  });
  it('component has directive', () => {
    // fixture.detectChanges();
    expect(htmlElement).toBeDefined('no selectable directives found!');
  });


});






describe('Something abstract', () => {
  describe('Something specific', () => {
    it('Expects truth to be true', () => expect(true).toBe(true, 'Expectation failed'));
  });
});
