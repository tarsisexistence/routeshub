# Connecting the dots

This part is optional. You can skip it if you don't want to organize into structures and feel comfortable with separate slices

{% hint style="info" %}
**Slices**

Slice is a modular entity. So, you can combine these entities together for more convenient / comfortable usage
{% endhint %}

Routeshub provides a few approaches to connect the slices:

* Separate slices. Use existed declared separate slices
* Declare the central hub. Gives all declared slices
* Create the union. Creates the entity of slices you want

## Declaring the hub

That step allows us to connect all pieces together and get the hub as one level of nesting

{% code-tabs %}
{% code-tabs-item title="hub.ts" %}
```typescript
import { getHubSlices } from 'routeshub';
import { AppChildNotes, AppNotes } from './hub/app.notes';
import { AboutNotes } from '../views/about/hub/about.notes';
import { AuthNotes } from '../views/auth/hub/auth.notes';

export interface Hub {
  app: AppNotes & AppChildNotes;
  about: AboutNotes;
  auth: AuthNotes;
}

export const hub = getHubSlices<Hub>();
```
{% endcode-tabs-item %}
{% endcode-tabs %}

## Creating Union

Allows performing flexible development steps

{% code-tabs %}
{% code-tabs-item title="hub.ts" %}
```typescript
import { createUnion } from 'routeshub';
import { aboutSlice } from '../views/about/hub/about.routes';
import { authSlice } from '../views/auth/hub/auth.routes';

// the union of about and auth slices
export const union = createUnion({
    about: aboutSlice,
    auth: authSlice
});

```
{% endcode-tabs-item %}
{% endcode-tabs %}

