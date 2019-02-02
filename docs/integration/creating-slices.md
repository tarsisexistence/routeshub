# Creating slices

It remains to do not so much. Creators to help 🧙♂ 🧞♂ 

## Creating Slices

{% code-tabs %}
{% code-tabs-item title="app.slice.ts" %}
```typescript
export const appSlice: Slice<R, C> = createRoot<R, C>(appNote);
```
{% endcode-tabs-item %}
{% endcode-tabs %}



{% code-tabs %}
{% code-tabs-item title="about.slice.ts" %}
```typescript
export const aboutSlice: Slice<AboutRoutes> = createFeature<AboutRoutes>(
  appSlice.about,
  aboutNote
);
```
{% endcode-tabs-item %}
{% endcode-tabs %}



{% code-tabs %}
{% code-tabs-item title="auth.slice.ts" %}
```typescript
export const authSlice: Slice<AuthRoutes> = createFeature<AuthRoutes>(
  appSlice.auth,
  authNote
);
```
{% endcode-tabs-item %}
{% endcode-tabs %}

