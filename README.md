# Routeshub

<a href="https://routeshub.gitbook.io/docs"><img src="https://github.com/maktarsis/routeshub/raw/master/docs/assets/logo.png" align="right" alt=""></a>

A **route manager** and pattern for **[Angular]**

* **Manages.** Introduces a new route management experience leading to better application control.
* **Navigation.** Provides declarative experience of navigation.
* **Fast.** In addition to speeding up development, it works as fast as it does without it.
* **Pluggable.** Engineered as a plug-in. Designed to be added at any time during the development process.
* **Human-understandable.** Supports code suggestions in the editors (with additional forces).
* **Pattern.** Provides unified approach to manage the routing of the entire application.
* **Small.** ~3kB (minified + gzipped). It uses [Angular] and [rxjs] as peerDependencies.

Read more about Routeshub on the [docs site](https://routeshub.gitbook.io)


## Install

```sh
npm install routeshub
```

## Usage

#### Simple **[module]**.routes.ts with slice declaration in the end
```typescript
...

import { APP_HUB_KEY, AppNotes } from './app.notes';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: AppComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

// creating the root slice
export const appSlice: Slice<AppNotes> = createRoot<AppNotes>(routes, APP_HUB_KEY);
```

#### Getting interface and unique slice key in **[module]**.notes.ts
```typescript
import { Note } from 'routeshub';

export interface AppNote {
  root: Note; // === ''
  about: Note;
  wildcard: Note; // === '**'
}

/** 
* Optional
* Provides opportunity to get slice in decorator
* instead of slice name (string)
*/
export const APP_HUB_KEY = Symbol();
```

#### Component
```typescript
... 
import { getSlice, Slice, Sliced } from 'routeshub';
import { AppNotes, APP_HUB_KEY } from '../hub/app.notes';

@Component({
  selector: 'app-header',
  template: `
  <nav>
    <a navLink="{{ app.root.state }}">Home</a>
    <a [navLink]="app.about.root.state">Location</a>
  </nav>
`
})
export class HeaderComponent {
  // getting slice by key
  @Sliced(APP_HUB_KEY)
  public app: Slice<AppNotes>;
  
  //or
  
   // getting slice by name
   @Sliced('app')
   public app: Slice<AppNotes>;
   
   // getting slice from fn
   @Sliced('app')
   public app = getSlice<AppNotes>(APP_HUB_KEY);
}
```

[Angular]: https://github.com/storeon/angular
[rxjs]: https://github.com/ReactiveX/rxjs

You can find a more complex example in this [repo](https://github.com/maktarsis/routeshub/tree/master/example-app)  here or on [GitBook](https://routeshub.gitbook.io/docs/example).

<br/>

# Hub
Routeshub offers an approach (pattern) to structure routing in the application. You can see it in this [repo](https://github.com/maktarsis/routeshub/tree/master/example-app).

This application should have directory app/routing that declares a starting configuration of the application via the routing module.

There you should have:
- routing module file
- routing hub file (optional) - declare the whole project hub with one nesting level of all slices
- other routing configuration folders (resolvers, guards, strategies) - manage other angular/routing api
- hub folder - an entry point of the hub, declare app.routes as usual + 1 line of code and app.notes (interfaces and key) files.

Feature modules of the application should also contain a hub folder that has **[featureName].notes** for interfaces and key/name and **[featureName].routes** files.

<br/>

# Concepts

## Note
The `Note` is input to reproduce the slice. Each `Note` represents one route and each module collects the route in the `Notes` bunch.

The example below shows capabilities and illustrates how this actually works. Unnecessary route information is shortened to three dots.

Now you do not need to create `Notes` by yourself, because this handles under the hood. Here is an example of how routes transform depending on the route path:
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
        path: 'about', // about => about
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
export interface AppChildNotes extends Root {
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
export interface AppNotes extends Root<AppChildNotes> {
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



export const appSlice = createRoot<AppNotes, AppChildNotes>(routes, { wildcard: 'notFound' });
```


## Slice
`Slice` is a modular entity that contains stateful module routes.

There are two ways to create the `slice`:
- **createRoot**
- **createFeature**

Each function takes the `routes: Routes` and list of options ({ root: 'NAME OF EMPTY PATH, wildcard: 'NAME OF ** PATH'}) to provide route name options as you have seen above (where we customized the route name by path) and local hub key as you have seen in the example. It provides an opportunity to fetch slice by key instead of slice name.

**Root** creator invokes only once to initialize the hub in the application. `createRoot` takes initial `appNotes` and produces a `slice` which will be used for subsequent feature creators to connect each other as a single tree.

```typescript
// possible records

export const appSlice = createRoot(routes);

// or
export const appSlice: Slice<AppNotes, AppChildNotes> = 
    createRoot<AppNotes,AppChildNotes>(routes);

// or 
export const appSlice = 
    createRoot<AppNotes, AppChildNotes>(routes, { wildcard: 'notFound' });

// or
export const appSlice = 
    createRoot<AppNotes, AppChildNotes>(routes, { wildcard: 'notFound' }, APP_HUB_KEY);

// or
export const appSlice = 
    createRoot<AppNotes, AppChildNotes>(routes, APP_HUB_KEY);
```

In turn, the **feature** creator is responsible for relations between parent and child nodes

```typescript
export const routes: Routes = [
  { path: '', component: AboutComponent }
];

/** 
  * when module has only one root ('') path
  * you can declare short type
*/
export type AboutNote = Root;

export const aboutSlice: Slice<AboutNote> = createFeature<AboutNote>(
  appSlice.about,
  aboutNote
);
```

## Union
`Union` is an entity that connects several selected slices. It takes an object of keys-values. 
Key - route name. Value - its slice.

It allows performing flexible development steps:
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
export class ExampleComponent {
  ...
  
  // or even declare in the straightforward way
  public union = createUnion({ 
    app: appSlice, 
    about: aboutSlice
   });
   
   ...
}
```

## Get Slice
Essentially, you need the slice to pass it into directive/decorator for navigation purposes.
There are several ways to get a slice:

-  **Slice const** - this came from create function and you can import this one into component.
```typescript
export const appSlice: Slice<AppNotes> = createRoot<AppNotes>(routes, APP_HUB_KEY);
```

-  **@Sliced decorator**. Apply this decorator on the component's prop. You should pass the key or slice name.
```typescript
@Component({
  ...
})
export class HeaderComponent {
  // getting slice by key
  @Sliced(APP_HUB_KEY)
  private app: Slice<AppNotes, AppChildNotes>;

  // getting slice by slice name
  @Sliced('about')
  private about: Slice<AboutNotes>;
}
```

-  **getSlice** - This is a function that works as decorator. Essentially, it is created as an alternative to @Sliced decorator.
```typescript
@Component({
  ...
})
export class HeaderComponent {
  // getting slice by key
  private app = getSlice<AppNotes, AppChildNotes>(APP_HUB_KEY);

  // getting slice by slice name
  private about = getSlice<AboutNotes>('about');
}
```

-  **Union** - This is similar to slice const way, but creates a union from any quantity of slices.
```typescript
@Component({
  ...
})
export class HeaderComponent {
    public union = createUnion({
      app: appSlice,
      about: aboutSlice,
      automobiles: automobileSlice,
      bikes: bikeSlice,
      bolids: bolidSlice
    });
}

```
-  **getHubSlices** - This is a function that returns all declared slices in the project.
```typescript
@Component({
  ...
})
export class HeaderComponent {
  public hub: Slices<Hub> = getHubSlices<Hub>();
}
```


## Navigation
**Routeshub** provides directives and functions to make your experience with navigation better.

Before you start, don't forget to import **NavigationModule**:
```typescript
import { NavigationModule } from 'routeshub';

@NgModule({
  imports: [
    NavigationModule
  ],
})
export class AppModule {
}
```

### navLink
```html
<!--dynamic route where you deal with { path: ':id' }-->
<li [navLink]="locationSlice.profile.state" 
    [navParams]="{id: USER_ID}">
    Profile
</li>


<!--with curly braces-->
<li navLink="{{locationSlice.map.state}}">Map</li>
<!--with square brackets-->
<li [navLink]="locationSlice.map.state">Map</li>
<!--with square brackets you can omit state props-->
<li [navLink]="locationSlice.map">Map</li>

<!--with active link-->
<li [navLink]="locationSlice.map.state" 
    navLinkActive="my-active-class">
    Map
</li>
```

### forwardParams
A function that inserts parameters into route's state and outputs a ready-made dynamic state. 
It allows you to forward as many object parameters as you like which means that you can pass more than one object with parameters. 

```typescript
...

@Component({
  ...
})
export class ExampleComponent {
  ...

  constructor(private router: Router) {}

  public navigateToProfile(): void {
    const toProfile = forwardParams(this.userSlice.profileId.state, { profileId: 77 })
    this.router.navigate(toProfile);
  }
}

```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate and keep the examples consistent.


## Changelog

Stay tuned with [changelog](https://github.com/maktarsis/routeshub/blob/master/CHANGELOG.md).


## License
[MIT](https://choosealicense.com/licenses/mit/)
