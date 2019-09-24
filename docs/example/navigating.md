# Navigating

First, make sure you have already exported **NavigationModule** in the hub file.

{% code-tabs %}
{% code-tabs-item title="any.hub.ts" %}
```typescript
...
import { NavigationModule } from 'routeshub';
...

@NgModule({
  exports: [
    ...
    NavigationModule
  ],
  ...
})
export class AnyHub {
}
```
{% endcode-tabs-item %}
{% endcode-tabs %}

Before we finished, we should get access for units in the component and then use them for navigation

As was mentioned previously, there are some different approaches of how you can get units:

* decorator @Secluded - apply the decorator on component property.
* getUnit - function that works as well as @Secluded decorator.
* getRegisteredUnits - returns all declared units.

### @Secluded decorator

{% code-tabs %}
{% code-tabs-item title="header.component.ts" %}
```typescript
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Unit, Secluded } from 'routeshub';
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
  @Secluded(APP_HUB_KEY)
  public app: Unit<AppNotes>;
  
  constructor(private router: Router) {}

  profile(): void {
    const url = forwardParams(this.app.id.state, { id: 0 });
    this.router.navigate(url).catch(console.error);
  }
}
```
{% endcode-tabs-item %}
{% endcode-tabs %}

### getUnit

{% code-tabs %}
{% code-tabs-item title="header.component.ts" %}
```typescript
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { getUnit, Unit } from 'routeshub';
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
  public app = getUnit<AppNotes>(APP_HUB_KEY);
  
  constructor(private router: Router) {}

  profile(): void {
    const url = forwardParams(this.app.id.state, { id: 0 });
    this.router.navigate(url).catch(console.error);
  }
}
```
{% endcode-tabs-item %}
{% endcode-tabs %}

### getRegisteredUnits

{% code-tabs %}
{% code-tabs-item title="header.component.ts" %}
```typescript
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Units, getRegisteredUnits } from 'routeshub';
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
  public hub: Units<Hub> = getRegisteredUnits<Hub>();
  
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

