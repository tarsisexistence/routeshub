# Creating Slices

It remains to do not so much. Creators to help 🧙♂

## Creating Slices

{% code-tabs %}
{% code-tabs-item title="app.slice.ts" %}
```typescript
import { appNotes, AppNotes as R } from './app.notes';
import { AppChildrenNotes as C } from './app-children.notes';

export const appSlice: Slice<R, C> = createRoot<R, C>(appNotes);
```
{% endcode-tabs-item %}
{% endcode-tabs %}



{% code-tabs %}
{% code-tabs-item title="about.slice.ts" %}
```typescript
import { appSlice } from '~app/routing/hub/app.slice';
import { aboutNotes, AboutNotes } from './about.notes';

export const aboutSlice: Slice<AboutNotes> = createFeature<AboutNotes>(
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
import { authNotes, AuthNotes } from './about.notes';

export const authSlice: Slice<AuthNotes> = createFeature<AuthNotes>(
  appSlice.auth,
  authNotes
);
```
{% endcode-tabs-item %}
{% endcode-tabs %}

