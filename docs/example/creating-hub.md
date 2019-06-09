# Creating Hub

Let's create the notes and slices

{% code-tabs %}
{% code-tabs-item title="app.hub.ts" %}
```typescript
import { createRoot, createNote, Root, Note } from 'routeshub';
import { routes } from './app.routes';

export interface AppChildrenNote extends Root {
  about: Note;
}

/**
* Root is the shortcut of root path
* Designed to speed up code reusing
*/
export interface AppNote extends Root<AppChildrenNote> {
  auth: Note;
  notFound: Note;
}

/**
  * it is equivalent of the code above
  * choose the one you comfortable with

  export interface AppNotes {
    root: Note<AppChildrenNote>
    auth: Note;
    notFound: Note;
  }

*/

/**
* you may be confused about the second argument
* by default route path '' transforms into property 'root'
* and '**' transforms into property 'wildcard'
* 
* So, you can customize property keys through the second argument
* as illustrated below
*/
export const appNote = createNote<AppNote>(routes, { wildcard: 'notFound' });

export const appSlice: Slice<AppNote, AppChildrenNote> = createRoot<
  AppNote,
  AppChildrenNote
>(appNote);

```
{% endcode-tabs-item %}

{% code-tabs-item title="about.hub.ts" %}
```typescript
import { createFeature, createNote, Root, Note } from 'routeshub';
import { routes } from './about.routes';
import { appSlice } from '../../../routing/app.hub';

export type AboutNote = Root;

export const aboutNote = createNote<AboutNote>(routes);

export const aboutSlice: Slice<AboutNote> = createFeature<AboutNote>(
  appSlice.about,
  aboutNote
);

```
{% endcode-tabs-item %}

{% code-tabs-item title="auth.note.ts" %}
```typescript
import { createFeature, createNote, Root, Note } from 'routeshub';
import { routes } from './auth.routes';
import { appSlice } from '../../../routing/app.hub';

export interface AuthNote extends Root {
  signIn: Note;
  signUp: Note;
  id: Note;
}

export const authNote = createNote<AuthNote>(routes);

export const authSlice: Slice<AuthNote> = createFeature<AuthNote>(
  appSlice.auth,
  authNote
);

```
{% endcode-tabs-item %}
{% endcode-tabs %}

{% hint style="success" %}
Setup
{% endhint %}



