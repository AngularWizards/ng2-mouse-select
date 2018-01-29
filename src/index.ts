import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectFrameComponent } from './select-frame.component';
import { NoSelectDirective } from './no-select.directive';
import { SelectableDirective } from './selectable.directive';
import { AllowSelectDirective } from './allow.select.directive';

export * from './select-frame.component';
export * from './no-select.directive';
export * from './selectable.directive';
export * from './allow.select.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    NoSelectDirective,
    SelectFrameComponent,
    SelectableDirective,
    AllowSelectDirective
  ],
  exports: [
    NoSelectDirective,
    SelectFrameComponent,
    SelectableDirective,
    AllowSelectDirective
  ]
})
export class SelectableModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SelectableModule,
      providers: []
    };
  }
}
