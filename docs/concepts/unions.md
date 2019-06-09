# Unions

Union is an entity that connects several selected slices

## Creating Union

Takes one object as argument. Value is a slice, key - its name. Invalid name will flush an error to prevent mistakes in the future.

```typescript
import { createUnion } from 'routeshub';
import { appSlice } from './hub/app.hub';
import { aboutSlice } from '../views/about/hub';
import { automobileSlice } from '../views/automobile/hub';
import { bikeSlice } from '../views/bike/hub';
import { bolidSlice } from '../views/bolid/hub';

export const union = createUnion({
  app: appSlice,
  about: aboutSlice,
  automobiles: automobileSlice,
  bikes: bikeSlice,
  bolids: bolidSlice
});

```

It's ok, if you want to declare it only one time. Next time you want to use it you will need to access  it in the component.

You can find unions useful because of their flexible design.

{% code-tabs %}
{% code-tabs-item title="header.component.ts" %}
```typescript
import { Component, OnInit } from '@angular/core';
import { createUnion } from 'routeshub';
import { appSlice as app } from '../../routing/hub/app.hub';
import { authSlice as auth } from '../../auth/hub';

@Component({
  selector: 'app-header',
  template: `  
  <nav>
    <a navLink="{{ union.app.root.state }}">Home</a>
    <a [navLink]="union.auth.signUp.state">Sign Up</a>
  </nav>
`
})
export class HeaderComponent implements OnInit {
  public union = createUnion({ app, auth });
}
```
{% endcode-tabs-item %}
{% endcode-tabs %}

It doesn't perform long and complicated calculations. So, you are free to use it everywhere.

