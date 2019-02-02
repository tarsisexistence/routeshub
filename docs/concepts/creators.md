# Creators

Creators are represents an idea of creation a tree-like structure from different route nodes

## **There are** only 2 types of creators:

* createRoot
* createFeature

**Root creator** _****_invokes only once to initialize a _hub_ ****and creates an entity for expanding the whole tree.

In turn, the **feature creator** is responsible for relations between parent and child nodes. It means that each child node could be as parent node to another child.

## Creating a root

An example is in `app.slice.ts`

```typescript
import { createRoot, Slice } from 'routeshub';
import { AppChildrenRoutes as C, appRoutes, AppRoutes as R } from '../notes';

export const appSlice: Slice<R, C> = createRoot<R, C>(appRoutes);
```

Actually, `AppRoutes` and `AppChildrenRoutes` are represents an interface of a note of _App_ module that has some routes paths and its an immediate children. They're describe an `appRoutes` variable.

## Creating features

An example is in `about.slice.ts`

```typescript
import { createFeature, Slice } from 'routeshub';
import { aboutRoutes, AboutRoutes } from '../notes';
import { appSlice } from './app.slice';

export const aboutSlice: Slice<AboutRoutes> = createFeature<AboutRoutes>(
  appSlice.about,
  aboutRoutes
);
```

As we noticed earlier, **feature creator** needs a parent' slice and its own note _to connect the dots_.

