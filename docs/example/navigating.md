# Navigating

First, we need to import **NavigationModule**

{% code-tabs %}
{% code-tabs-item title="app.module.ts" %}
```typescript
...
import { NavigationModule } from 'routeshub';
...

@NgModule({
  imports: [
    ...
    NavigationModule
  ],
  ...
})
export class AppModule {
}
```
{% endcode-tabs-item %}
{% endcode-tabs %}

Before we finished, we should get access for slices in the component and then use them for navigation

As was mentioned previously, there are some different approaches of how you can use slices:

* decorator @Sliced - apply the decorator on component property  \(preferable\)
* getSlice - function that works as well as @Sliced decorator.
* separately - get access for each slice
* hub - declare and get access for all slices

### @Sliced decorator

{% code-tabs %}
{% code-tabs-item title="header.component.ts" %}
```typescript
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Slice, Sliced } from 'routeshub';
import { AppNotes, APP_HUB_KEY } from '../../routing/hub/app.notes';

@Component({
  selector: 'app-header',
  template: `
  <nav>
    <a navLink="{{ app.root.state }}">Home</a>
    <a [navLink]="app.auth.state">Auth</a>
    <a [navLink]="app.account.state" [navParams]="{account: 1234}">Account</a>
    <button (click)=profile()>Profile</button>
  </nav>
`
})
export class HeaderComponent {
  @Sliced(APP_HUB_KEY)
  public app: Slice<AppNotes>;
  
  constructor(private router: Router) {}

  profile(): void {
    const url = forwardParams(this.app.id.state, { id: 0 });
    this.router.navigate(url).catch(console.error);
  }
}
```
{% endcode-tabs-item %}
{% endcode-tabs %}

### getSlice

{% code-tabs %}
{% code-tabs-item title="header.component.ts" %}
```typescript
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { getSlice, Slice } from 'routeshub';
import { AppNotes, APP_HUB_KEY } from '../../routing/hub/app.notes';

@Component({
  selector: 'app-header',
  template: `
  <nav>
    <a navLink="{{ app.root.state }}">Home</a>
    <a [navLink]="app.auth.state">Auth</a>
    <a [navLink]="app.account.state" [navParams]="{account: 1234}">Account</a>
    <button (click)=profile()>Profile</button>
  </nav>
`
})
export class HeaderComponent {
  public app = getSlice<AppNotes>(APP_HUB_KEY);
  
  constructor(private router: Router) {}

  profile(): void {
    const url = forwardParams(this.app.id.state, { id: 0 });
    this.router.navigate(url).catch(console.error);
  }
}
```
{% endcode-tabs-item %}
{% endcode-tabs %}

### Separate 

{% code-tabs %}
{% code-tabs-item title="header.component.ts" %}
```typescript
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Slice } from 'routeshub';
import { appSlice } from '../../routing/hub/app.routes';
import { AppNotes } from '../../routing/hub/app.notes';

@Component({
  selector: 'app-header',
  template: `
  <nav>
    <a navLink="{{ app.root.state }}">Home</a>
    <a [navLink]="app.auth.state">Auth</a>
    <button (click)=profile()>Profile</button>
  </nav>
`
})
export class HeaderComponent {
  public app: Slice<AppNotes> = appSlice;
  
  constructor(private router: Router) {}
  
  profile(): void {
    const url = forwardParams(this.app.id.state, { id: 0 });
    this.router.navigate(url).catch(console.error);
  }
}
```
{% endcode-tabs-item %}
{% endcode-tabs %}

### Hub

{% code-tabs %}
{% code-tabs-item title="header.component.ts" %}
```typescript
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Slices, getHubSlices } from 'routeshub';
import { Hub } from '../../routing/hub';

@Component({
  selector: 'app-header',
  template: `
  <nav>
    <a navLink="{{ hub.app.root.state }}">Home</a>
    <a [navLink]="hub.auth.signUp.state">Sign Up</a>
    <button (click)=profile()>Profile</button>
  </nav>
`
})
export class HeaderComponent {
  public hub: Slices<Hub> = getHubSlices<Hub>();
  
  constructor(private router: Router) {}
  
  navigateSomewhere(): void {
    this.router
      .navigate(forwardParams(this.hub.auth.id.state, { id: 2 }))
      .catch(console.error);
  }
}
```
{% endcode-tabs-item %}
{% endcode-tabs %}

That's it. Have fun ✌ 

