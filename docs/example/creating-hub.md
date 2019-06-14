# Creating Hub

Let's create the notes and slices

{% code-tabs %}
{% code-tabs-item title="app.notes.ts" %}
```typescript
import { createRoot, createNote, Root, Note } from 'routeshub';

export interface AppChildNotes extends Root {
  about: Note;
}

/**
* Root is the shortcut of root path
* Designed to speed up code reusing
*/
export interface AppNotes extends Root<AppChildNotes> {
  auth: Note;
  notFound: Note;
}

/**
  * it is equivalent of the code above
  * choose the one you comfortable with
  export interface AppNotes {
    root: Note<AppChildNotes>
    auth: Note;
    notFound: Note;
  }
*/

// unique key of app hub. That we should add as argument of its slice declaration in routes file
export const APP_HUB_KEY = Symbol();
```
{% endcode-tabs-item %}

{% code-tabs-item title="about.notes.ts" %}
```typescript
import { createFeature, Root } from 'routeshub';
import { appSlice } from '../../../routing/app.hub';

export type AboutNotes = Root;

export const ABOUT_HUB_KEY = Symbol();
```
{% endcode-tabs-item %}

{% code-tabs-item title="auth.notes.ts" %}
```typescript
import { createFeature, Root, Note } from 'routeshub';
import { appSlice } from '../../../routing/app.hub';

export interface AuthNotes extends Root {
  signIn: Note;
  signUp: Note;
  id: Note;
}

export const AUTH_HUB_KEY = Symbol();
```
{% endcode-tabs-item %}
{% endcode-tabs %}

Next, we need to update routes files. Exactly we have to declare just one variable in the and of the file that gets routes and optional name parameters and key from notes \(also optional\)

{% code-tabs %}
{% code-tabs-item title="app.routes.ts" %}
```typescript
....

/**
* you may be confused about the second argument
* by default route path '' transforms into property 'root'
* and '**' transforms into property 'wildcard'
* 
* So, you can customize property keys through the second argument
* as illustrated below
*/
export const appSlice: Slice<AppNotes, AppChildNotes> = createRoot<
  AppNotes,
  AppChildNotes
>(appRoutes, { wildcard: 'notFound' }, APP_HUB_KEY);
```
{% endcode-tabs-item %}

{% code-tabs-item title="about.routes.ts" %}
```typescript
...

export const aboutSlice: Slice<AboutNotes> = createFeature<AboutNotes>(
  appSlice.about,
  aboutRoutes,
  ABOUT_HUB_KEY
);
```
{% endcode-tabs-item %}

{% code-tabs-item title="auth.routes.ts" %}
```typescript
...

export const authSlice: Slice<AuthNotes> = createFeature<AuthNotes>(
  appSlice.auth,
  authRoutes,
  AUTH_HUB_KEY
);
```
{% endcode-tabs-item %}
{% endcode-tabs %}

{% hint style="success" %}
Setup
{% endhint %}



