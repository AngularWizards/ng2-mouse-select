# ng2-mouse-select  

Native Angular 2 directives for selecting multiple items with the mouse. 

[![npm version](https://badge.fury.io/js/ng2-mouse-select.svg)](https://badge.fury.io/js/ng2-mouse-select)  [![Build Status](https://travis-ci.org/AngularWizards/ng2-mouse-select.svg?branch=master)](https://travis-ci.org/AngularWizards/ng2-mouse-select)

## Table of contents
<ul>
     <li><a href="#description">Description</a></li>
    <li><a href="#installation">Installation</a></li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#directives">Directives</a></li>
    <li><a href="#scoping">Scoping</a></li>
</ul>


## Description

This library has following features:

- Adding user-specific class(es) to selected items.

- Works well with other directives, i.e. drag&drop.

- Preserves selection till clicked away from the `selectable` items.
  If `clearOnUnselected` option is used, selection is also canceled when clicking on previously unselected, but also `selectable` items.

- With **cmd** (ctrl) button you can either **continue adding elements to previous selection**, or **selectively add/remove item** to new/existing selection.

- With the configuration of the `filter` you can determine on which elements will the directive be active, that is, on which elements will the selection be started. (Useful for enabling other directives on items that need other behaviour, like drag&drop).
  
- As of version 0.4, <a href="#scoping">scoping</a> is supported. In this case, only items with the scope of the first selected item get in the selection.

- Able to ensure sameness. If `ensureSame` is used, only items with the same properties and corresponding values as those from the first selected item get in the selection.

- Able to change color of the selector frame dynamically.




## Installation


```bash
$ npm install ng2-mouse-select
```

## Usage

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

```xml
<!-- You can now use your library component in some.component.html -->
<!-- Example: -->
 <div app-selectFrame [selectorColor]="'#CC0000'"
         [ensureSame]="['property1','property2']" 
         [clearOnUnselected]="false"
         [filter]="{ allowSelectElements: true, thisElement: true }" 
         (data)="onMousePalletsSelected($event)">

<div appAllowSelect>
....
 <tr some-component  
     selectable [selectScope]="'someScope'"  [selectedClass]="'mySpecialClassNameForSelectedItems'" 
     [someClassAsInputForTheComponent]="someClass"
     [select]="{'property1':someClass.data1,'property2':someClass.data2}">
  </tr>
....
</div>

```

## Directives

### app-selectFrame directive

`app-selectFrame` - component that holds the selectable components/directives.

#### Inputs

`ensureSame`:`Array<string>` - array of properties. When defined, only those items are selectable, which have the same properties and the same corresponding values as the first item that was selected. 

`clearOnUnselected`:`boolean` - default false. When true, selection is cleared also when user clicks on selectable but unselected items. Normally, selection is cleared only when the user clicks away from the selectable item(s). 

`filter`:`{ allowSelectElements: boolean, thisElement: boolean }` - On default behaviour, selection is active on the document. However, sometimes we want to exclude the selection directive on some items, so that other directives can do their work. 

With `allowSelectElements:true` we say that the selection is enabled on all elements with `appAllowSelect` directive. 
Setting `thisElement:true` sets just the `app-selectFrame` as the element on which the selection is available.
Elements that were enabled with `appAllowSelect` get added to the list of element on which the selection gets started.


`selectorColor` - Default yellow. Dynamically changeable.

#### Events 

`data:Array<any>` - Data which is returned on the end of the selection. If nothing was selected, [] is returned. 

As of version, scoping is enabled. If you are using scope, outputed data changes format. See the section on <a href="#scoping">scoping</a>.



### appAllowSelect directive

Allows a selection on the HTML element, when `filter` option is used.


### noSelect directive

Blocks text-selection from the element and its descendants.


### selectable directive

#### Inputs

`select` - here you can set the the object(s) you want to pass with the selection. See one example above.

`selectedClass` - default 'selected'. Here you set the name of the class that will style your `selectable` directive when it is selected.

`selectedScope` - default null. See section on <a href="#scoping">scoping</a>.


## Scoping

As of version 0.4. scoping is supported. That means that selectable items are grouped based on scope. When enabled, only elements with the same scope can come into selection. This is done on the level of the selectable items.
When used, data that you get back gets a bit changed.
For instance, if before scoping, to get your data, you used: 

```typescript
data=ev;
```
, with the `'pallets'` scope you would write:

```typescript
data=ev[pallets];
```

## License

MIT © [Miroslav Kovac](mailto:miro1.kovac@gmail.com)
