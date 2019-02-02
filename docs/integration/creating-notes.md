# Creating Notes

We are going to declare our inputs. In general, this is probably the only boring part but carries a lot of useful things and most importantly - is the declared foundation

## 

{% code-tabs %}
{% code-tabs-item title="app.note.ts" %}
```typescript
import { RootRoute, RouteNote, RoutesNotes } from 'routeshub';

export interface AppChildrenRoutes extends RootRoute {
  about: RouteNote;
}

const appChildrenRoute: RoutesNotes<AppChildrenRoutes> = {
  root: { path: '' },
  about: {
    path: 'about',
    lazyPath: 'app/views/about/about.module#AboutModule'
  }
};

export interface AppRoutes extends RootRoute {
  auth: RouteNote;
  notFound: RouteNote;
}

export const appNotes: RoutesNotes<AppRoutes, AppChildrenRoutes> = {
  root: {
    path: '',
    children: appChildrenRoute
  },
  auth: {
    path: 'auth',
    lazyPath: 'app/views/auth/auth.module#AuthModule'
  },
  notFound: {
    path: '**'
  }
};
```
{% endcode-tabs-item %}
{% endcode-tabs %}



{% code-tabs %}
{% code-tabs-item title="about.note.ts" %}
```typescript
import { RootRoute, RouteNote, RoutesNotes } from 'routeshub';

export type AboutRoutes = RootRoute;

export const aboutNote: RoutesNotes<AboutRoutes> = {
  root: {
    path: ''
  }
};
```
{% endcode-tabs-item %}
{% endcode-tabs %}



{% code-tabs %}
{% code-tabs-item title="auth.note.ts" %}
```typescript
import { RootRoute, RouteNote, RoutesNotes } from 'routeshub';

export interface AuthRoutes extends RootRoute {
  signIn: RouteNote;
  signUp: RouteNote;
}

export const AuthNote: RoutesNotes<AuthRoutes> = {
  root: {
    path: ''
  },
  signIn: {
    path: 'sign-in'
  },
  signUp: {
    path: 'sign-up'
  }
};
```
{% endcode-tabs-item %}
{% endcode-tabs %}

## First improvements



{% code-tabs %}
{% code-tabs-item title="app.routes.ts" %}
```typescript
export const routes: Routes = [
  {
    path: appNote.root.path,
    pathMatch: 'full',
    component: AppComponent,
    children: [
      {
        path: appNote.root.children.root.path,
        pathMatch: 'full',
        redirectTo: appNote.root.children.about.path
      },
      {
        path: appNote.root.children.about.path,
        pathMatch: 'full',
        loadChildren: appNote.root.children.about.lazyPath
      }
    ]
  },
  {
    path: appNote.auth.path
    pathMatch: 'full',
    loadChildren: appNote.auth.lazyPath
  }
  {
    path: appNote.notFound.path,
    redirectTo: appNote.root.path
  }
];
```
{% endcode-tabs-item %}
{% endcode-tabs %}



{% code-tabs %}
{% code-tabs-item title="about.routes.ts" %}
```typescript
export const aboutRoutes: Routes = [
  {
    path: aboutNote.root.path
    component: AboutComponent
  }
];
```
{% endcode-tabs-item %}
{% endcode-tabs %}



{% code-tabs %}
{% code-tabs-item title="auth.routes.ts" %}
```typescript
export const authRoutes: Routes = [
  {
    path: authNote.root.path
    redirectTo: authNote.signIn.path
  },
  {
    path: authNote.signIn.path
    component: SignInComponent
  },
  {
    path: authNote.signUp.path
    redirectTo: SignUpComponent
  },
];
```
{% endcode-tabs-item %}
{% endcode-tabs %}



Looks a bit safer, isn't it? 🙃 

