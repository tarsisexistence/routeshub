# Routeshub

<a href="https://routeshub.gitbook.io/docs"><img src="https://github.com/retarsis/routeshub/raw/master/docs/assets/logo.png" align="right" alt=""></a>

A **route manager** and pattern for **[Angular]**

* **Manager.** Introduces a new route management experience that leads to better application control.
* **Navigation.** It provides declarative navigation experience.
* **Fast.** In addition to speeding up development, it works as fast as it does without it.
* **Pluggable.** Engineered as a plug-in and designed to be added at any time during the development process.
* **Pattern.** It provides a unified approach managing the routing of the entire application.
* **Small.** ~3.5 kB (minified + gzipped). It uses [Angular] and [rxjs] as peerDependencies.

In short, this is an add-on to the **@angular/router**, which provides state-based routing for medium to large-size applications.

Read more about Routeshub on the [docs site](https://routeshub.gitbook.io)

<br/>

## Install
To get started, you need to install the package from npm
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
    loadChildren: () => import('example-app/app/views/about/about.module').then(m => m.AboutModule)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
```

#### Getting interface based on our routes and unique unit key (as symbol) in **[module]**.notes.ts
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
import { NavigationModule, connectFeatures, createRoot } from 'routeshub';
import { routes } from './app.routes';
import { APP_NOTES_KEY, AppNotes } from './app.notes';
import { aboutUnit } from '../views/about/hub/about.hub';

/**
 * Creates stateful named App routes
 */
createRoot<AppNotes>(routes, { key: APP_NOTES_KEY });

/**
 * connects features which have attached relating to the parent module
 *
 * about module has its routes which we want to connect
 */
connectFeatures<AppNotes>(APP_NOTES_KEY, {
  about: aboutUnit
});

/**
 * Routing module contains its configuration
 * and providers (resolvers, guard, interceptors, etc.)
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

import { getUnit, Unit, Secluded } from 'routeshub';
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
  // getting unit by key
  @Secluded(APP_NOTES_KEY)
  public app: Unit<AppNotes>;
  
  //or
  
   // getting the unit by name
   @Secluded('app')
   public app: Unit<AppNotes>;
   
   //or
   
   // getting unit from getUnit function
   public app = getUnit<AppNotes>(APP_NOTES_KEY);
}
```

[Angular]: https://github.com/storeon/angular
[rxjs]: https://github.com/ReactiveX/rxjs

You can find a more complex example in this [repo](https://github.com/retarsis/routeshub/tree/master/example-app)  here or on [GitBook](https://routeshub.gitbook.io/docs/example).

<br/>

# Hub
Routeshub offers an approach (pattern) to structure routing in the application. You can explore it in this [repo](https://github.com/retarsis/routeshub/tree/master/example-app).

**Guideline**:
- Each module in the application has a hub directory
- hub directory contains three files that configure the routing of the current module.
1. hub - sets routing configuration; exports RoutingModule and NavigationModule; connects feature units.
2. notes - it is a place for interfaces and the unique key of the unit.
3. routes - simple routes file as is without any changes.

![diagram](http://i.piccy.info/i9/baf248d94b1260e13d5bff6acb6e6727/1569138770/128577/1338898/2019_09_22_10_51_00.jpg)

<br/>

# Concepts

## Unit
`Unit` is a modular entity which contains stateful module routes.

![unit diagram](http://i.piccy.info/i9/395309194dfc663ad7c07dad3c482d15/1569140574/118208/1338898/unit.jpg)

There are two ways to create the `unit`:
- **createRoot**
- **createFeature**

Each creator takes the `routes: Routes` and an object of options 
- key - unit identifier and accepts string or symbol
- routeName - accepts an object with optional custom names for a wildcard ('**') and root ('') paths
- nearby - accepts lazy units (**connectors**), which are outputs of  **feature creator**. A nearby option should use when one or more connected features are eager modules with their own routes files.

**Root** creator invokes only once to initialize the hub in the application. `createRoot` takes initial `appNotes`. 

**Usage example**:
```typescript
 createRoot<AppNotes, AppChildNotes>(routes, {
  key: APP_NOTES_KEY,
  routeName: { root: 'home', wildcard: 'notFound' },
  nearby: { map: mapUnit  }
 });
```

In turn, the **feature** creator is responsible for creating lazy units (**connectors**), which should connect to the parent unit.

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

export const aboutConnector: Connector<AboutNotes> = createFeature<AboutNotes>(aboutNote, { key: ABOUT_NOTES_KEY });
```

<br/>

## Note
You need to understand how routeshub transforms routes into the keys. All notes related things routeshub handles internally.

The `Note` is input to reproduce the unit. Each `Note` represents one route.

**In short, it assigns the names to the 'spots'**

The example below shows capabilities and illustrates how this works. Unnecessary route information shortened.

```typescript
export const routes: Routes = [
  {
    path: '', // name => 'root' by default (customizable)
    children: [
      { path: '' }, // name => 'root' by default (customizable)
      { path: 'about' } // name => about 
    ]
  },
  { path: ':first_name'}, // name => firstName
  { path: 'person/:person-age' }, // name => personAge
  { path: '**'} // name => 'wildcard' by default (customizable). In example we'll rename it to 'notFound'
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
  * btw, this shorthand provides an opportunity to describe root children interface through generics
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


export const appUnit = createRoot<AppNotes, AppChildNotes>(routes, { routeName: { wildcard: 'notFound' }});
```

<br/>

## Get Unit
Essentially, you need the unit to pass it into a directive/decorator for navigation purposes.
There are several ways to get a unit:

-  **@United decorator**. Apply this decorator on the component's prop. You should pass the key or unit name.
```typescript
@Component({
  ...
})
export class HeaderComponent {
  // getting unit by key
  @Seclude(APP_NOTES_KEY)
  private app: Unit<AppNotes, AppChildNotes>;

  // getting unit by unit name
  @Seclude('about')
  private about: Unit<AboutNotes>;
}
```

-  **get unit** - This is a function that works as a decorator. Primarily, it created as an alternative to @Secluded decorator.
```typescript
@Component({
  ...
})
export class HeaderComponent {
  // getting unit by key
  private app = getUnit<AppNotes, AppChildNotes>(APP_NOTES_KEY);

  // getting unit by name
  private about = getUnit<AboutNotes>('about');
}
```

-  **getRegisteredUnits** - This is a function that returns all declared units in the project.
```typescript
@Component({
  ...
})
export class HeaderComponent {
  public hub: Units<Hub> = getRegisteredUnits<Hub>();
}
```

<br/>

## Navigation
**Routeshub** provides directives and functions to make your experience with navigation better.

Before you start, don't forget to import **NavigationModule**.
It's a good practice importing NavigationModule into the **[module]**.hub.ts file.


### navLink
```html
<!--dynamic route where you deal with { path: ':id' }-->
<li [navLink]="locationUnit.profile.state" 
    [navParams]="{id: USER_ID}">
    Profile
</li>


<!--with curly braces-->
<li navLink="{{locationUnit.map.state}}">Map</li>
<!--with square brackets-->
<li [navLink]="locationUnit.map.state">Map</li>
<!--with square brackets you can omit state props-->
<li [navLink]="locationUnit.map">Map</li>

<!--with active link-->
<li [navLink]="locationUnit.map.state" 
    navLinkActive="my-active-class">
    Map
</li>
```

### forwardParams
A function that inserts parameters into the route's state and outputs a ready-made dynamic state. 

```typescript
...

@Component({
  ...
})
export class ExampleComponent {
  ...

  constructor(private router: Router) {}

  public navigateToProfile(): void {
    const toProfile = forwardParams(this.userUnit.profileId.state, { profileId: 77 })
    this.router.navigate(toProfile);
  }
}

```

<br/>

## Changelog

Stay tuned with [changelog](https://github.com/retarsis/routeshub/blob/master/CHANGELOG.md).

<br/>

## License
This project is [MIT](https://choosealicense.com/licenses/mit/) licensed.

<br/>

## Contributing
Contributions are welcome. For major changes, please open an issue first to discuss what you would like to change.

If you made a PR, make sure to update tests as appropriate and keep the examples consistent.

<br/>

## Contributors ✨

Thanks go to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/retarsis"><img src="https://avatars1.githubusercontent.com/u/21989873?v=4" width="100px;" alt="Max Tarsis"/><br /><sub><b>Max Tarsis</b></sub></a><br /><a href="https://github.com/retarsis/routeshub/commits?author=retarsis" title="Code">💻</a> <a href="#projectManagement-retarsis" title="Project Management">📆</a> <a href="https://github.com/retarsis/routeshub/commits?author=retarsis" title="Documentation">📖</a> <a href="#ideas-retarsis" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://medium.com/@LayZeeDK"><img src="https://avatars1.githubusercontent.com/u/6364586?v=4" width="100px;" alt="Lars Gyrup Brink Nielsen"/><br /><sub><b>Lars Gyrup Brink Nielsen</b></sub></a><br /><a href="https://github.com/retarsis/routeshub/commits?author=LayZeeDK" title="Code">💻</a> <a href="#ideas-LayZeeDK" title="Ideas, Planning, & Feedback">🤔</a> <a href="#tool-LayZeeDK" title="Tools">🔧</a></td>
  </tr>
</table>

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

<br/>
