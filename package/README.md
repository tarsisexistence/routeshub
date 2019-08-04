# Routeshub

<a href="https://routeshub.gitbook.io/docs"><img src="https://github.com/maktarsis/routeshub/raw/master/docs/assets/logo.png" align="right" alt=""></a>

A **route manager** and pattern for **[Angular]**

* **Manager.** Introduces a new route management experience leading to better application control.
* **Navigation.** Provides declarative experience of navigation.
* **Fast.** In addition to speeding up development, it works as fast as it does without it.
* **Pluggable.** Engineered as a plug-in. Designed to be added at any time during the development process.
* **Pattern.** Provides a unified approach managing the routing of the entire application.
* **Small.** ~3.5kB (minified + gzipped). It uses [Angular] and [rxjs] as peerDependencies.

Read more about Routeshub on the [docs site](https://routeshub.gitbook.io)


## Install

```sh
npm install routeshub
```

## Usage

#### Declare a simple **[module]**.routes.ts file
```typescript
...

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
```

#### Getting interface based on our routes and unique slice key (as symbol) in **[module]**.notes.ts
```typescript
import { Note } from 'routeshub';

export interface AppNotes {
  root: Note; // === ''
  about: Note; // === 'about'
  wildcard: Note; // === '**'
}

export const APP_NOTES_KEY = Symbol();
```

#### Creating a hub **[module]**.hub.ts file
```typescript
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavigationModule, connectFeatures, createRoot } from 'lib';
import { routes } from './app.routes';
import { APP_NOTES_KEY, AppNotes } from './app.notes';
import { aboutSlice } from '../views/about/hub/about.hub';

/**
 * Creates stateful named App routes
 */
createRoot<AppNotes>(routes, { key: APP_NOTES_KEY });

/**
 * connects features which have attached relation
 * for this module
 *
 * {
 *  path: 'about'
 *  loadChildren: loadChildren: () => import('app/views/about/about.module').then(m => m.AboutModule)
 * }
 */
connectFeatures<AppNotes>(APP_NOTES_KEY, {
  about: aboutSlice
});

/**
 * Routing module contains its configuration
 * and providers (resolvers, guard, interceptors etc)
 * 
 * Exports RouterModule
 * and NavigationModule for navLink directives
 */
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule, NavigationModule]
})
export class AppHub {}
```


#### Component
```typescript
...

import { getSlice, Slice, Sliced } from 'routeshub';
import { AppNotes, APP_NOTES_KEY } from '../hub/app.notes';

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
  @Sliced(APP_NOTES_KEY)
  public app: Slice<AppNotes>;
  
  //or
  
   // getting slice by name
   @Sliced('app')
   public app: Slice<AppNotes>;
   
   //or
   
   // getting slice from getSlice function
   public app = getSlice<AppNotes>(APP_NOTES_KEY);
}
```

[Angular]: https://github.com/storeon/angular
[rxjs]: https://github.com/ReactiveX/rxjs

You can find a more complex example in this [repo](https://github.com/maktarsis/routeshub/tree/master/example-app)  here or on [GitBook](https://routeshub.gitbook.io/docs/example).

<br/>

# Hub
Routeshub offers an approach (pattern) to structure routing in the application. You can explore it in this [repo](https://github.com/maktarsis/routeshub/tree/master/example-app).

**Guideline**:
- Each module in application has a hub directory
- hub directory contains three files that configure routing of the current module
1. hub - sets routing configuration (forRoot/forFeature) and exports RoutingModule and NavigationModule
2. notes - describes module's routes and creates a unique key
3. routes - declares routes of current module

<br/>

# Concepts

## Slice
`Slice` is a modular entity that contains stateful module routes.

There are two ways to create the `slice`:
- **createRoot**
- **createFeature**

Each function takes the `routes: Routes` and an object of options 
- key - accepts string or symbol
- routeName - accepts object with optional custom values root: "NAME OF '' PATH", wildcard: "NAME OF ** PATH"}
- detached - accepts _lazy slice_ which produces **feature creator**. Detached option uses only when one or more features are eager modules which connect to some module and those eager module has its own paths.

**Root** creator invokes only once to initialize the hub in the application. `createRoot` takes initial `appNotes` 

**Usage example**:
```typescript
 createRoot<AppNotes, AppChildNotes>(routes, {
   key: APP_NOTES_KEY,
   routeName: { root: 'home', wildcard: 'notFound' }
 });
```

In turn, the **feature** creator is responsible for creating lazy slices which should be connected to parent slice

```typescript
export const routes: Routes = [
  { path: '', component: AboutComponent }
];

/** 
  * when module has only one root ('') path
  * you can declare short type
*/
export type AboutNotes = Root;

const ABOUT_NOTES_KEY = Symbol();

export const aboutSlice: LazySlice<AboutNotes> = createFeature<AboutNotes>(aboutNote, { key: ABOUT_NOTES_KEY });
```

<br/>

## Note
This section is optional to understand how routes transform into the keys.

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
  },
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



export const appSlice = createRoot<AppNotes, AppChildNotes>(routes, { routeName: { wildcard: 'notFound' }});
```

<br/>

## Get Slice
Essentially, you need the slice to pass it into directive/decorator for navigation purposes.
There are several ways to get a slice:

-  **@Sliced decorator**. Apply this decorator on the component's prop. You should pass the key or slice name.
```typescript
@Component({
  ...
})
export class HeaderComponent {
  // getting slice by key
  @Sliced(APP_NOTES_KEY)
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
  private app = getSlice<AppNotes, AppChildNotes>(APP_NOTES_KEY);

  // getting slice by slice name
  private about = getSlice<AboutNotes>('about');
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

<br/>

## Navigation
**Routeshub** provides directives and functions to make your experience with navigation better.

Before you start, don't forget to import **NavigationModule**.
It's a good practice importing NavigationModule into the **[module]**.hub.ts file


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

<br/>

## Changelog

Stay tuned with [changelog](https://github.com/maktarsis/routeshub/blob/master/CHANGELOG.md).

<br/>

## License
This project is [MIT](https://choosealicense.com/licenses/mit/) licensed.

<br/>

## Contributing
Contributions are welcome. For major changes, please open an issue first to discuss what you would like to change.

If you made a PR, make sure to update tests as appropriate and keep the examples consistent.

<br/>

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/maktarsis"><img src="https://avatars1.githubusercontent.com/u/21989873?v=4" width="100px;" alt="Max Tarsis"/><br /><sub><b>Max Tarsis</b></sub></a><br /><a href="https://github.com/maktarsis/routeshub/commits?author=maktarsis" title="Code">💻</a> <a href="#projectManagement-maktarsis" title="Project Management">📆</a> <a href="https://github.com/maktarsis/routeshub/commits?author=maktarsis" title="Documentation">📖</a> <a href="#ideas-maktarsis" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://medium.com/@LayZeeDK"><img src="https://avatars1.githubusercontent.com/u/6364586?v=4" width="100px;" alt="Lars Gyrup Brink Nielsen"/><br /><sub><b>Lars Gyrup Brink Nielsen</b></sub></a><br /><a href="https://github.com/maktarsis/routeshub/commits?author=LayZeeDK" title="Code">💻</a> <a href="#ideas-LayZeeDK" title="Ideas, Planning, & Feedback">🤔</a> <a href="#tool-LayZeeDK" title="Tools">🔧</a></td>
  </tr>
</table>

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

<br/>
