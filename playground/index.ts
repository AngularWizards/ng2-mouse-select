/**
 * This is only for local test
 */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Component } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { SelectableModule } from '../src/index';
import { TestComponent } from './test-component';

@Component({
  selector: 'app-root',
  template: `<test-component></test-component>`
})
class AppComponent { }

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent, TestComponent],
  imports: [BrowserModule, SelectableModule]
})
class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);
