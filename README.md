# ng2-mouse-select
Angular 2 directive for selecting multiple items with the mouse

## Description

This library has following features:

- 'app-selectFrame' - component within which you can define selectable components
  with the help of 'selectable' directives. (example down)

- allows filtering of selection based on configurable properties with the use of 'ensureSame' input (so that only items with the same value(s) of these properties get selected).

- preserves selection till clicked away from the 'selectable' items. If 'clearOnUnselected' option is used, selection is also canceled when clicking on previously unselected 'selectable' items.

- with the configuration of the 'filter' you can determine on which elements will the directive be active, that is, on which elements can you start the selection
  (for instance, you can configure the selection to be active just on the app-selectFrame, or you can add
  'appAllowSelect' directive to every element on which you want the selection to be active).

- setting a 'selectable' directive to a component inside the 'app-selectFrame' enables you to define
  data which will be returned from the component after the selection (via the 'select' input).

## Installation

To install this library, run:

```bash
$ npm install ng2-mouse-select --save
```

## Consuming your library

Once you have published your library to npm, you can import your library in any Angular application by running:

```bash
$ npm install ng2-mouse-select
```

and then from your Angular Module:

```typescript

// Import your library
import { SelectableModule } from 'ng2-mouse-select';

@NgModule({
    ...
    imports: [
      ...
        SelectableModule
    ],
   ...
})
```

Once your library is imported, you can use its components and directives and pipes in your Angular app:

```xml
<!-- You can now use your library component in component.html -->
<!-- Example: -->
 <div app-selectFrame [ensureSame]="['property1','property2']" [clearOnUnselected]="false"
         [filter]="{ allowSelectElements: true, thisElement: true }" 
         (data)="onMousePalletsSelected($event)">

<div appAllowSelect>
....
 <tr some-component [someClass]="someClass" 
     selectable
     [select]="{'property1':someClass.data1,'property2':someClass.data2}">
  </tr>
....
</div>

```

## License

MIT © [Miroslav Kovac](mailto:miro1.kovac@gmail.com)
