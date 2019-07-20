# Creating Hub

So, in this step we have to create a router module that has connection purpose.

{% code-tabs %}
{% code-tabs-item title="app.hub.ts" %}
```typescript
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { connectFeatures, createRoot, NavigationModule } from 'routeshub';

import { routes } from './app.routes';
import { APP_NOTES_KEY, AppChildNotes, AppNotes } from './app.notes';
import { aboutSlice } from '../views/about/hub/about.hub';
import { AboutNotes } from '../views/about/hub/about.notes';
import { authSlice } from '../views/auth/hub/auth.hub';
import { AuthNotes } from '../views/auth/hub/auth.notes';
import { locationSlice } from '../views/location/hub/location.hub';
import { LocationNotes } from '../views/location/hub/location.notes';

createRoot<AppNotes, AppChildNotes>(routes, 
  {
      /**
      * key prop is familiar for all of us
      * it provides a possibility to identify the slice
      */
      key: APP_NOTES_KEY,
      /**
      * you may be confused about routeName property of options
      * by default route path '' transforms into property 'root'
      * and '**' transforms into property 'wildcard'
      */
      routeName: { wildcard: 'notFound' },
      /**
      * detached prop are routes which were imported into the module
      * but have own routes file and have no direct relations with
      * paths in module they were imported
      */
      detached: {
          location: locationSlice
      }
  }
);

/**
* connects feature modules
* with direct path relations
*
* could be invoked at any time during runtime
*/
connectFeatures<AppNotes, AppChildNotes>(APP_NOTES_KEY, {
  about: aboutSlice,
  auth: authSlice
});

/**
 * Describes the project's hubs (optional)
 */
export interface Hub {
  app: AppNotes & AppChildNotes;
  about: AboutNotes;
  auth: AuthNotes;
  location: LocationNotes;
}

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);

@NgModule({
  imports: [routing],
  exports: [RouterModule, NavigationModule]
})
export class AppHub {
}

```
{% endcode-tabs-item %}

{% code-tabs-item title="about.hub.ts" %}
```typescript
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { createFeature, LazySlice } from 'routeshub';

import { ABOUT_NOTES_KEY, AboutNotes } from './about.notes';
import { aboutRoutes } from './about.routes';

export const aboutSlice: LazySlice<AboutNotes> = createFeature<AboutNotes>(
  aboutRoutes,
  { key: ABOUT_NOTES_KEY } 
);

@NgModule({
  imports: [RouterModule.forChild(aboutRoutes)],
  exports: [RouterModule]
})
export class AboutHub {}

```
{% endcode-tabs-item %}

{% code-tabs-item title="auth.hub.ts" %}
```typescript
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router'
;
import { createFeature } from 'routeshub';

import { AUTH_NOTES_KEY, AuthNotes } from './auth.notes';
import { authRoutes } from './auth.routes';

export const authSlice: Slice<AuthNotes> = createFeature<AuthNotes>(
  authRoutes,
  { key: AUTH_NOTES_KEY }
);

@NgModule({
  imports: [RouterModule.forChild(authRoutes)],
  exports: [RouterModule]
})
export class AuthHub {}

```
{% endcode-tabs-item %}

{% code-tabs-item title="location.hub.ts" %}
```typescript
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { createFeature, LazySlice } from 'routeshub';

import { LOCATION_NOTES_KEY, LocationNotes } from './location.notes';
import { locationRoutes } from './location.routes';

export const locationSlice: LazySlice<LocationNotes> = 
  createFeature<LocationNotes>(locationRoutes, { key: LOCATION_NOTES_KEY } 
);

@NgModule({
  imports: [RouterModule.forChild(locationRoutes)],
  exports: [RouterModule]
})
export class LocationHub {}

```
{% endcode-tabs-item %}
{% endcode-tabs %}



