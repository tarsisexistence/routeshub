# Creating Notes

Let's declare the notes

{% code-tabs %}
{% code-tabs-item title="app.notes.ts" %}
```typescript
import { RootRoute, RouteNote, RoutesNotes } from 'routeshub';
import { appChildrenNotes, AppChildrenNotes } from './app-children.notes';

export interface AppNotes extends RootRoute {
  auth: RouteNote;
  notFound: RouteNote;
}

const rootNote: RouteNote = {
  path: '',
  children: appChildrenNotes
};
const authNote: RouteNote = {
  path: 'auth',
  lazy: 'app/views/auth/auth.module#AuthModule'
};
const notFoundNote: RouteNote = {
  path: '**'
};

export const appNotes: RoutesNotes<AppNotes, AppChildrenNotes> = {
  root: rootNote,
  auth: authNote,
  notFound: notFoundNote
};
```
{% endcode-tabs-item %}

{% code-tabs-item title="app-children.notes.ts" %}
```typescript
import { RootRoute, RouteNote, RoutesNotes } from 'routeshub';

export interface AppChildrenNotes extends RootRoute {
  about: RouteNote;
}

const aboutNote: RouteNote = {
  path: 'about',
  lazy: 'app/views/about/about.module#AboutModule'
};

export const appChildrenNotes: RoutesNotes<AppChildrenNotes> = {
  root: { path: '' },
  about: aboutNote
};
```
{% endcode-tabs-item %}

{% code-tabs-item title="about.notes.ts" %}
```typescript
import { RootRoute, RouteNote, RoutesNotes } from 'routeshub';

export type AboutNotes = RootRoute;

export const aboutNotes: RoutesNotes<AboutNotes> = {
  root: {
    path: ''
  }
};
```
{% endcode-tabs-item %}

{% code-tabs-item title="auth.notes.ts" %}
```typescript
import { RootRoute, RouteNote, RoutesNotes } from 'routeshub';

export interface AuthNotes extends RootRoute {
  signIn: RouteNote;
  signUp: RouteNote;
}

export const AuthNotes: RoutesNotes<AuthNotes> = {
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



So, now it looks like we have first benefits

{% code-tabs %}
{% code-tabs-item title="app.routes.ts" %}
```typescript
import { appNotes } from './app.notes';

export const routes: Routes = [
  {
    path: appNotes.root.path,
    pathMatch: 'full',
    component: AppComponent,
    children: [
      {
        path: appNotes.root.children.root.path,
        pathMatch: 'full',
        redirectTo: appNotes.root.children.about.path
      },
      {
        path: appNotes.root.children.about.path,
        pathMatch: 'full',
        loadChildren: appNotes.root.children.about.lazy
      }
    ]
  },
  {
    path: appNotes.auth.path,
    pathMatch: 'full',
    loadChildren: appNotes.auth.lazy
  },
  {
    path: appNotes.notFound.path,
    redirectTo: appNotes.root.path
  }
];
```
{% endcode-tabs-item %}

{% code-tabs-item title="about.routes.ts" %}
```typescript
import { aboutNotes } from './about.notes';

export const aboutRoutes: Routes = [
  {
    path: aboutNotes.root.path
    component: AboutComponent
  }
];
```
{% endcode-tabs-item %}

{% code-tabs-item title="auth.routes.ts" %}
```typescript
import { authNotes } from './auth.notes';

export const authRoutes: Routes = [
  {
    path: authNotes.root.path,
    redirectTo: authNote.signIn.path
  },
  {
    path: authNotes.signIn.path,
    component: SignInComponent
  },
  {
    path: authNotes.signUp.path,
    redirectTo: SignUpComponent
  }
];
```
{% endcode-tabs-item %}
{% endcode-tabs %}

