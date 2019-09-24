# Notes

Note is input to reproduce the slice.

You won't deal with them directly in the application.

## What Does it Do?

Let's take a look on example of routes file and see in what it transforms

```typescript
import { createNote, Note } from 'routeshub';
import { ViewComponent } from '../view.component';
import { SuperPlaceComponent } from '../super-place.component';
import { CityComponent } from '../city.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ViewComponent,
    children: [
      {
        path: '',
        redirectTo: 'about',
      },
      {
        path: 'about',
        loadChildren: () => import('app/views/about/about.module').then(m => m.AboutModule)
      }
    ]
  },
  {
    path: 'super-place',
    pathMatch: 'full',
    component: SuperPlaceComponent
  },
  {
    path: 'super_place/:city',
    pathMatch: 'full',
    component: CityComponent
  }
  {
    path: '**',
    redirectTo: ''
  }
];

// note of those routes generates under the hood of createRoot/createFeature functions
export const appUnit = createRoot(routes);

// now, appUnit is equal to
{
  root: { path: '', name: 'root', children: [
    {
      root: { path: '', name: 'root' },
      about: { path: 'about', name: 'about' }
    }
  ]},
  superPlace: { path: 'super-place', name: 'superPlace' },
  city: { path: 'super_place/:city', name: 'city' },
  notFound:{ path: '**', name: 'notFound' }
}
```

You may have lots of questions here. 

First, routeshub converts paths into camelCase keys. 

Variables in paths are recognizable. 

Notes interfaces could have shortcuts for reusable reason. Root interface just adds `root: Note`  to common interface. Also, root path can have children routes. If so, then just pass generic children `Root<Childnote>` as illustrated above.

If you want to know more, then make sure to read **API** section 

{% page-ref page="../api/" %}

