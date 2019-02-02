# Creating slices

It remains to do not so much. Creators to help 🧙♂ 🧞♂ 

## Creating Slices

{% code-tabs %}
{% code-tabs-item title="app.slice.ts" %}
```typescript
import { appNotes, AppRoutes as R } from './app.note';
import { AppChildrenRoutes as C } from './app-children.note';

export const appSlice: Slice<R, C> = createRoot<R, C>(appNotes);
```
{% endcode-tabs-item %}
{% endcode-tabs %}



{% code-tabs %}
{% code-tabs-item title="about.slice.ts" %}
```typescript
import { appSlice } from '~app/routing/hub/app.slice';
import { aboutNotes, AboutRoutes } from './about.note';

export const aboutSlice: Slice<AboutRoutes> = createFeature<AboutRoutes>(
  appSlice.about,
  aboutNotes
);
```
{% endcode-tabs-item %}
{% endcode-tabs %}



{% code-tabs %}
{% code-tabs-item title="auth.slice.ts" %}
```typescript
import { appSlice } from '~app/routing/hub/app.slice';
import { authNotes, AuthRoutes } from './about.note';

export const authSlice: Slice<AuthRoutes> = createFeature<AuthRoutes>(
  appSlice.auth,
  authNotes
);
```
{% endcode-tabs-item %}
{% endcode-tabs %}

