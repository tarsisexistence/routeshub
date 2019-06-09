# Slices

Slice is a modular entity that contains stateful module routes

**There are two ways to create the slice:**

* createRoot
* createFeature

**Root creator** _****_invokes only once to initialize the _hub_ in application. It takes initial \(app\) note and produces the slice which will be used for subsequent feature creators.

In turn the **feature creator** is responsible for relations between parent and child nodes \(slices\).

## Creating Root

Usage example:

```typescript
import { createRoot } from 'routeshub';
import { appNote, AppNote, routes } from './'

export const appSlice: Slice<AppNote> = createRoot<AppNote>(appNote);
```

## Creating Feature

Takes two arguments and two generic types \(the second is optional for children\). The first argument is a parent slice that links to this module. The second one is a note of the current module.

Usage example:

```typescript
import { createFeature, createNote, Root, Slice } from 'routeshub';
import { aboutNote, AboutNote, routes } from './';
import { appSlice } from '../../../routing/hub';

export const aboutSlice: Slice<AboutNote> = createFeature<AboutNote>(
  appSlice.about,
  aboutNote
);

```

As we noticed earlier,  **feature creator** needs the parent slice to connect it with with its note entity.

