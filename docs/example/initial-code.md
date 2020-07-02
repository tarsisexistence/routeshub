# Initial Code

Let's imagine. We have such routes:

* **App** - root
* **About** - App's child
* **Auth** - lazy module that has a direct connection to App
* **Location** - detached \(nearby\) eager module that imported into App and has its routes
* **NotFound** - wildcard, the default behavior for not matched paths

## Initial Code

Below is only the code of the routes files

{% tabs %}
{% tab title="app.routes.ts" %}
```typescript
import { ViewComponent } from '../view.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ViewComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'about'
      },
      {
        path: 'about',
        loadChildren: 'app/views/about/about.module#AboutModule'
      }
    ]
  },
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
```
{% endtab %}

{% tab title="about.routes.ts" %}
```typescript
import { AboutComponent } from './about.component';

export const aboutRoutes: Routes = [
  {
    path: ''
    component: AboutComponent
  }
];
```
{% endtab %}

{% tab title="auth.routes.ts" %}
```typescript
import { SignUpComponent } from './sign-up.component';
import { SignInComponent } from './sign-in.component';

export const authRoutes: Routes = [
  {
    path: ''
    pathMatch: 'full',
    redirectTo: 'sign-in'
  },
  {
    path: 'sign-up'
    redirectTo: SignUpComponent
  },
  {
    path: 'sign-in'
    component: SignInComponent
  },
  {
    path: 'sign-in/:id'
    component: SignInComponent
  },
];
```
{% endtab %}

{% tab title="location.routes.ts" %}
```typescript
import { LocationComponent  } from './location.component';

export const locationRoutes: Routes = [
  {
    path: ''
    component: LocationComponent
  }
];
```
{% endtab %}
{% endtabs %}

Now we're going to integrate **routeshub** into the project.

