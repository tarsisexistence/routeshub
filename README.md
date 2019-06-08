# Routeshub

<a href="https://routeshub.gitbook.io/docs"><img src="https://github.com/maktarsis/routeshub/raw/master/docs/assets/logo.png" align="right" alt=""></a>

A route manager and pattern for **[Angular]**

* **Pluggable.** Engineered by plugin design. Designed to be added at any time during the development process.
* **Fast.** It calculates only the code that is actually used and navigates efficiently via directives.
* **Human-understandable.** Supports code completion in the editors.
* **Pattern.** Provides unified approach to managing the routing of the entire application.
* **Small.** ~3kB (minified + gzipped). It uses [Angular] and [rxjs] as peerDependencies.

Read more about Routeshub on the [docs site](https://routeshub.gitbook.io)



## Install

```sh
npm install routeshub
```

## Usage


#### Basic routes setup
```typescript
export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: AppComponent
  },
  {
    path: 'location',
    component: LocationComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];
```

#### Connection
```typescript
import { createNote, createRoot, Note, Slice } from 'routeshub';
import { routes } from './app.routes';

export interface AppNote {
  root: Note; // === ''
  location: Note;
  wildcard: Note; // === '**'
}

export const appNote = createNote<AppNote>(routes);

export const appSlice: Slice<AppNote> = createRoot<AppNote>(appNote);
```

#### Component
```typescript
import { Component, OnInit } from '@angular/core';
import { Slice } from 'routeshub';
import { AppNote, appSlice } from '../hub';

@Component({
  selector: 'app-header',
  template: `
  <nav>
    <a navLink="{{ app.root.state }}">Home</a>
    <a [navLink]="app.location.root.state">Location</a>
  </nav>
`
})
export class HeaderComponent implements OnInit {
  public app: Slice<AppNote>;

  public ngOnInit(): void {
    this.app = appSlice;
  }
}
```

[Angular]: https://github.com/storeon/angular
[rxjs]: https://github.com/ReactiveX/rxjs

You can find a more complex example in this repo [here](https://github.com/maktarsis/routeshub/tree/master/example-app) or on [GitBook](https://routeshub.gitbook.io/docs/example)

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate and keep the examples consistent.

## Changelog

Stay tuned with [changelog](https://github.com/maktarsis/routeshub/blob/master/CHANGELOG.md)

## License
[MIT](https://choosealicense.com/licenses/mit/)

