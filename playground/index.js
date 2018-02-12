var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * This is only for local test
 */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Component } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { SelectableModule } from '../src/index';
import { TestComponent } from './test-component';
let AppComponent = class AppComponent {
};
AppComponent = __decorate([
    Component({
        selector: 'app-root',
        template: `<test-component></test-component>`
    })
], AppComponent);
let AppModule = class AppModule {
};
AppModule = __decorate([
    NgModule({
        bootstrap: [AppComponent],
        declarations: [AppComponent, TestComponent],
        imports: [BrowserModule, SelectableModule]
    })
], AppModule);
platformBrowserDynamic().bootstrapModule(AppModule);
