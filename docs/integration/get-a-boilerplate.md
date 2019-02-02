# Initial

Let's imagine, we have such routes:

* App 
* About as children of the App
* Auth
* NotFound

## Boilerplate

Below is only the code of the routes files

{% code-tabs %}
{% code-tabs-item title="app.routes.ts" %}
```typescript
export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: AppComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'about'
      },
      {
        path: 'about',
        pathMatch: 'full',
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
{% endcode-tabs-item %}
{% endcode-tabs %}

{% code-tabs %}
{% code-tabs-item title="about.routes.ts" %}
```typescript
export const aboutRoutes: Routes = [
  {
    path: ''
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
    path: ''
    redirectTo: 'sign-in'
  },
  {
    path: 'sign-in'
    component: SignInComponent
  },
  {
    path: 'sign-up'
    redirectTo: SignUpComponent
  },
];
```
{% endcode-tabs-item %}
{% endcode-tabs %}

Now we need to integrate **routeshub** in the project 👨💻 

