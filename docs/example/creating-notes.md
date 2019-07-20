# Creating Notes

Let's create the notes and slices

{% code-tabs %}
{% code-tabs-item title="app.notes.ts" %}
```typescript
import { createRoot, createNote, Root, Note } from 'routeshub';

/**
* describes children path
*/
export interface AppChildNotes extends Root {
  about: Note;
}

/**
* Root interface is the shortcut of ''(root) path
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

// unique key of app hub. It acts as a unique routes identifier
export const APP_NOTES_KEY = Symbol();
```
{% endcode-tabs-item %}

{% code-tabs-item title="about.notes.ts" %}
```typescript
import { createFeature, Root } from 'routeshub';

export type AboutNotes = Root;

export const ABOUT_NOTES_KEY = Symbol();
```
{% endcode-tabs-item %}

{% code-tabs-item title="auth.notes.ts" %}
```typescript
import { createFeature, Root, Note } from 'routeshub';

export interface AuthNotes extends Root {
  signIn: Note;
  signUp: Note;
  id: Note;
}

export const AUTH_NOTES_KEY = Symbol();
```
{% endcode-tabs-item %}

{% code-tabs-item title="location.notes.ts" %}
```typescript
import { createFeature, Root } from 'routeshub';

export type LocationNotes = Root;

export const LOCATION_NOTES_KEY = Symbol();
```
{% endcode-tabs-item %}
{% endcode-tabs %}



