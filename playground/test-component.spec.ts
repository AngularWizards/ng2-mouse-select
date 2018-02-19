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
  let selectableDirectiveHTML: HTMLElement;
  let testComponentH1Title: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SelectableModule],
      declarations: [TestComponent],
      providers: [
        { provide: ComponentFixtureAutoDetect, useValue: true }
      ]
    })
      .compileComponents();
  });
  beforeEach(() => {

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    selectableDirectiveHTML = debugElement.query(By.directive(SelectableDirective)).nativeElement;
    testComponentH1Title = debugElement.query(By.css('h1')).nativeElement;
  });
  it('component has title', () => {
     fixture.detectChanges();
    expect(testComponentH1Title.innerHTML).toEqual('Testing the component!');
  });
  it('component has directive', () => {
     fixture.detectChanges();
    expect(selectableDirectiveHTML).toBeDefined('selectable directive found!');
  });



});

