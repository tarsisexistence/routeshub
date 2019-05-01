# Slices

Essentially, slice is an output. It just defines the enhanced route

## Getting Know with Output

To create a slice we need :

* parent's slice
* current note
* interface that describe a new feature slice

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

{% hint style="success" %}
That's it
{% endhint %}

