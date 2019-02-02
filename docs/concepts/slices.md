# Slices

Essentially, slices are the outputs. Output means a serialized route that has its own state

## Getting Know with Output

To create a slice we need a few things:

* parent' slice
* current note
* interface that describe a new feature slice

```typescript
import { createFeature, Slice } from 'routeshub';

export const aboutSlice: Slice<AboutRoutes> = createFeature<AboutRoutes>(
  appSlice.about,
  aboutNotes
);
```

{% hint style="success" %}
Once you have got a slice you can start to do the magic 🎇 
{% endhint %}

