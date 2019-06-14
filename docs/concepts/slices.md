# Slices

Slice is a modular entity that contains stateful module routes

**There are two ways to create the slice:**

* createRoot
* createFeature

**Root creator** _****_invokes only once to initialize the _hub_ in application. It takes initial \(app\) routes, name options\(optional\) and key\(optional\) and produces the slice which will be used for subsequent feature creators.

In turn the **feature creator** is responsible for relations between parent and child nodes \(slices\).

## Creating Root

Usage example:

{% code-tabs %}
{% code-tabs-item title="app.routes.ts" %}
```typescript
import { createRoot } from 'routeshub';
import { AppNotes, APP_HUB_KEY } from './app.notes';
import { ViewComponent } from '../view/view.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ViewComponent,
  {
    path: 'auth'
    pathMatch: 'full',
    loadChildren: 'app/views/auth/auth.module#AuthModule'
  }
  {
    path: '**',
    redirectTo: ''
  }
];

export const appSlice: Slice<AppNotes> = createRoot<AppNotes>(
  routes,
  { root: 'home', // path '' will be named as 'home' instead of default 'root'
    wildcard: 'notFound' // path '**' (any mismatch) will be named as 'notFound' instead of default 'wildcard'
  },
  APP_HUB_KEY
);
```
{% endcode-tabs-item %}
{% endcode-tabs %}

## Creating Feature

Takes two required arguments and two generic types \(the second is optional for children\). The first argument is a prop of parent slice that links to this module. The second one are routes of the current module. Last argument is optional for hub key. 

Usage example:

```typescript
import { createFeature, createNote, Root, Slice } from 'routeshub';
import { appSlice } from '../../../routing/hub/app.routes';
import { AboutNotes, ABOUT_HUB_KEY } from './about.notes';
import { AboutComponent } from './about.component';

export const aboutRoutes: Routes = [
  {
    path: ''
    component: AboutComponent
  }
];

export const aboutSlice: Slice<AboutNotes> = createFeature<AboutNotes>(
  appSlice.about,
  aboutRoutes,
  ABOUT_HUB_KEY
);

```

As we noticed earlier,  **feature creator** needs the parent slice to connect it with with its note entity.

