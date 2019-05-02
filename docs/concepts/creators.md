# Creators

Creator enhances route nodes what makes that route stateful. Essentially, it creates a tree-like structure from different entry point

## **Types**

**There are only two types of creators**

* createRoot
* createFeature

**Root creator** _****_invokes only once to initialize the _hub_ in application. It creates an entity for expanding the whole tree.

In turn the **feature creator** is responsible for relations between parent and child nodes.

## Creating a root

Use example:

```typescript
// grabbing the root creator and interface
import { createRoot, Slice } from 'routeshub';
// importing app (root) notes and its interface
import { appNotes, AppNotes as R } from './app.notes';
// importing children interface, because that module has
import { AppChildrenNotes as C } from './app-children.notes';

// creating app (root) slice
export const appSlice: Slice<R, C> = createRoot<R, C>(appNotes);
```

Actually, `AppRoutes` and `AppChildrenRoutes` are interface of _App module note_ . They're describe `appRoutes` variable.

## Creating features

Use example:

```typescript
// grabbing the feature creator and interface
import { createFeature, Slice } from 'routeshub';
// importing the parent slice
import { appSlice } from 'app/routing/hub/app.slice';
// importing module's notes and its interface
import { aboutNotes, AboutRoutes } from './about.notes';

// creating feature slice
export const aboutSlice: Slice<AboutRoutes> = createFeature<AboutRoutes>(
  appSlice.about,
  aboutNotes
);
```

As we noticed earlier, **feature creator** needs the parent slice and its own note to link the branches.

