# Creating Hub

So, in this step, we have to create a router module that has a connection purpose.

{% tabs %}
{% tab title="app.hub.ts" %}
```typescript
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { connectFeatures, createRoot, NavigationModule } from 'routeshub';

import { routes } from './app.routes';
import { APP_NOTES_KEY, AppChildNotes, AppNotes } from './app.notes';
import { aboutConnector } from '../views/about/hub/about.hub';
import { AboutNotes } from '../views/about/hub/about.notes';
import { authConnector } from '../views/auth/hub/auth.hub';
import { AuthNotes } from '../views/auth/hub/auth.notes';
import { locationConnector } from '../views/location/hub/location.hub';
import { LocationNotes } from '../views/location/hub/location.notes';

createRoot<AppNotes, AppChildNotes>(routes, 
  {
      /**
      * key prop is familiar for all of us
      * it provides a possibility to identify the unit
      */
      key: APP_NOTES_KEY,
      /**
      * you may be confused about routeName property of options
      * by default route path '' transforms into property 'root'
      * and '**' transforms into property 'wildcard'
      */
      routeName: { wildcard: 'notFound' },
      /**
      * nearby prop are modules which were imported into the module
      * but they have their own routes files without direct routes relations
      * with module in which they were imported
      * paths in module they were imported
      */
      nearby: {
          location: locationConnector
      }
  }
);

/**
* connects feature modules with direct path relations
* could be invoked at any time during runtime
*/
connectFeatures<AppNotes, AppChildNotes>(APP_NOTES_KEY, {
  about: aboutConnector,
  auth: authConnector
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
{% endtab %}

{% tab title="about.hub.ts" %}
```typescript
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { createFeature, Connector } from 'routeshub';

import { ABOUT_NOTES_KEY, AboutNotes } from './about.notes';
import { aboutRoutes } from './about.routes';

export const aboutConnector: Connector<AboutNotes> = createFeature<AboutNotes>(
  aboutRoutes,
  { key: ABOUT_NOTES_KEY } 
);

@NgModule({
  imports: [RouterModule.forChild(aboutRoutes)],
  exports: [RouterModule]
})
export class AboutHub {}

```
{% endtab %}

{% tab title="auth.hub.ts" %}
```typescript
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router'
;
import { createFeature, Connector } from 'routeshub';

import { AUTH_NOTES_KEY, AuthNotes } from './auth.notes';
import { authRoutes } from './auth.routes';

export const authConnector: Connector<AuthNotes> = createFeature<AuthNotes>(
  authRoutes,
  { key: AUTH_NOTES_KEY }
);

@NgModule({
  imports: [RouterModule.forChild(authRoutes)],
  exports: [RouterModule]
})
export class AuthHub {}

```
{% endtab %}

{% tab title="location.hub.ts" %}
```typescript
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { createFeature, Connector } from 'routeshub';

import { LOCATION_NOTES_KEY, LocationNotes } from './location.notes';
import { locationRoutes } from './location.routes';

export const locationConnector: Connector<LocationNotes> = 
  createFeature<LocationNotes>(locationRoutes, { key: LOCATION_NOTES_KEY } 
);

@NgModule({
  imports: [RouterModule.forChild(locationRoutes)],
  exports: [RouterModule]
})
export class LocationHub {}

```
{% endtab %}
{% endtabs %}



