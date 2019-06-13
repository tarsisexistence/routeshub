# Routeshub

<a href="https://routeshub.gitbook.io/docs"><img src="https://github.com/maktarsis/routeshub/raw/master/docs/assets/logo.png" align="right" alt=""></a>

A route manager and pattern for **[Angular]**

* **Pluggable.** Engineered by plugin design. Designed to be added at any time during the development process.
* **Fast.** It calculates only the code that is actually used and navigates efficiently via directives.
* **Human-understandable.** Supports code suggestions in the editors.
* **Pattern.** Provides unified approach to managing the routing of the entire application.
* **Small.** ~3kB (minified + gzipped). It uses [Angular] and [rxjs] as peerDependencies.

Read more about Routeshub on the [docs site](https://routeshub.gitbook.io)



## Install

```sh
npm install routeshub
```

## Usage


#### Routes setup
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
import { AppNote, appSlice } from hub;

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


## Note
The `note` is input to reproduce the. The `note` should be created with `createNote()` function. It takes the routes list `Routes` from @angular/router and produces only useful information about routes needed to produce the `slice` later.

Each module responsible for creating its own `note` from its routes.
Example below shows capabilities and illustrates how it actually works. Unnecessary route information will be shortened into three dots

```typescript
export const routes: Routes = [
  {
    path: '', // name => root
    ...
    children: [
      {
        path: '', // name => root
        redirectTo: 'about',
      },
      {
        path: 'about',
        loadChildren: () => import('app/views/about/about.module').then(m => m.AboutModule)
      }
    ]
  },
  {
    path: ':first_name', // name => firstName
    ...
  },
  {
    path: 'person/:person-age', // name => personAge
    ...
  }
  {
    path: '**',  // name => wildcard (by default with possibility to customize). In example we'll rename to 'notFound'
    redirectTo: ''
  }
];

// Root interface helps to short frequently repeated actions
export interface AppChildrenNote extends Root {
  about: Note;
}

/**
  * it is equivalent of the previous interface
  * 
  export interface AppChildNotes {
    root: Note;
    about: Note;
  }
*/

/**
  * also, it provides opportunity to describe 
  * root children entity
*/
export interface AppNote extends Root<AppChildrenNote> {
  firstName: Note;
  personAge: Note;
  notFound: Note;
}

/**
  * it is equivalent of the previous interface
  * 
  export interface AppNotes {
    root: Note<AppChildNotes>
    firstName: Note;
    personAge: Note;
    wildcard: Note;
  }
*/



export const appNote = createNote<AppNote>(routes, { wildcard: 'notFound' );
```


## Slice
The `slice` is a modular entity that contains stateful module routes.

There are two ways to create the `slice`:
- **createRoot**
- **createFeature**

**Root** creator invokes only once to initialize the hub in application. It takes initial (app) the note and procudes the slice which will be used for subsequent feature creators.

```typescript
export const appSlice: Slice<AppNote, AppChildrenNote> = 
    createRoot<AppNote,AppChildrenNote>(appNote);
```

In turn the **feature** creator is responsible for relations between parent and child nodes

```typescript
export const routes: Routes = [
  { path: '', component: AboutComponent }
];

/** 
  * when module has only one root ('') path
  * you can declare short type
*/
export type AboutNote = Root;

export const aboutNote = createNote<AboutNote>(routes);

export const aboutSlice: Slice<AboutNote> = createFeature<AboutNote>(
  appSlice.about,
  aboutNote
);
```

## Union
The `union` is an entity that connects several selected slices. It takes an object of keys and values. Key is a route name and value - its slice.

It allows performing flexible development steps

```typescript
export const exampleUnion = createUnion({
  app: appSlice,
  about: aboutSlice,
});
```

```typescript
...

@Component({
  ...
})
export class ExampleComponent implements OnInit {
  ...
  
  // getting access in the component from the place we declared above
  public union = exampleUnion;

  // or even declare in the straighforward way
  public union = createUnion({ 
    app: appSlice, 
    about: aboutSlice
   });
   
   ...
}
```

## Useful Functions

### forwardParams
A function that inserts parameters into route's state. Outputs a ready-made dynamic state. It allows to forward as many objects parameters as you like. It means that you can pass more than one object with parameters.

```typescript
...

@Component({
  ...
})
export class ExampleComponent implements OnInit {
  ...

  constructor(private router: Router) {}

  public navigateToProfile(): void {
    const toProfile = forwardParams(this.userSlice.profileId.state, { profileId: 77 })
    this.router.navigate(toProfile);
  }
}

```

### getHub
A function that returns all declared slices in the application (hub)

```typescript
hub
export interface Hub {
  app: AppNote & AppChildrenNote;
  about: AboutNote;
  automobiles: AutomobileNote;
  bikes: BikeNote;
  bolids: BolidNote;
}

export const hub = getHub<Hub>();
```


## Hub
Routeshub offers an approach (pattern) to structure routing in the application. You can see it in this repo -> [example-app folder](https://github.com/maktarsis/routeshub/tree/master/example-app)

The point is the following. Application has a directory **routing** that declares starting configuration of the application.

There you should have:
- routing module file
- routing hub (optional) file - there you can declare the whole project hub with one nesting level of all slices
- resolvers/etc folders - folders where you can manage other routing api
- hub folder - is an entry point of the hub. There you declare app.routes and app.hub files.

Feature modules in the application should contain hub folder that has **[featureName].hub** and **[featureName].routes** files.



## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate and keep the examples consistent.


## Changelog

Stay tuned with [changelog](https://github.com/maktarsis/routeshub/blob/master/CHANGELOG.md)


## License
[MIT](https://choosealicense.com/licenses/mit/)
