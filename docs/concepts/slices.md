# Slices

Slice is a modular entity. It contains the stateful module routes

There are two create functions:

* **createRoot** - creates a root \(app\) / tree base
* **createFeature** - creates a lazy slice which connects one by one to parent slice \(root slice or lazy slice\)

**Root creator** _****_invokes only once to initialize the _hub_ of application. It takes initial \(app\) routes and options. 

In turn the **feature creator** is responsible for relations between parent and child nodes \(slices\).

As mentioned above, creator functions have the second argument of options which is object of:

* **key** - slice identifier
* **routeName** - accepts an object with optional custom names for wildcard path \('\*\*'\) and root path \(''\)
* **detached** - routes of eager modules which were imported into the parent module, but have own routes file, that's why they have no direct relations with paths of parent module.  

### Creating Root

```typescript
createRoot<AppNotes, AppChildNotes>(
  appRoutes, 
  {
      /**
      * key prop is familiar for all of us
      * it provides a possibility to identify the slice
      */
      key: APP_NOTES_KEY,
      /**
      * you may be confused about routeName property of options
      * by default route path '' transforms into property 'root'
      * and '**' transforms into property 'wildcard'
      */
      routeName: { root: 'home', wildcard: 'notFound' },
      /**
      * detached prop are routes which were imported into the module
      * but have own routes file and have no direct relations with
      * paths in module they were imported
      */
      detached: {
          location: locationSlice
      }
  }
);
```

### Creating Feature

```typescript
export const locationSlice: LazySlice<
    AboutNotes, AboutChildNotes
> = createFeature<LocationNotes>(
    locationRoutes, 
    { 
        key: LOCATION_NOTES_KEY,
        detached: {
            map: mapSlice
        }
    } 
);
```

