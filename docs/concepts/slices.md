# Slices

Essentially, slices are the outputs. This just defines the serialized route

## Getting Know with Output

To create a slice we need a few things:

* parent' slice
* current note
* interface that describe a new feature slice

```typescript
import { createFeature, Slice } from 'routeshub';
import { aboutNotes, AboutNotes } from './about.notes';

export const aboutSlice: Slice<AboutNotes> = createFeature<AboutNotes>(
  appSlice.about,
  aboutNotes
);
```

{% hint style="success" %}
Once you have got a slice you can start to do the magic 🎇 
{% endhint %}

