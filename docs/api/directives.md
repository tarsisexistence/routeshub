# Directives

## Navigation

Routeshub offers directive `navLink` for navigation. It is extended by `routerLink` and doing the same as `routerLink` except one thing. `navLink` helps to manage dynamic paths \(parameters\) with additional attribute `navParams` . That design makes performance improvements in comparison, as it was before

Before we start using `navLink`, we need to import module to get access.

**Import example:**

```typescript
...
import { NavigationModule } from 'routeshub';
...

@NgModule({
  imports: [
    ...
    NavigationModule
  ],
  ...
})
export class AppModule {
}

```

#### Use example:

```markup

<li [navLink]="slices.locationSlice.map.state">Map</li>

<li [navLink]="slices.locationSlice.search">Search</li>

<li [navLink]="slices.userSlice.profile.state" 
    [navParams]="{id: USER_ID}">
    Profile
</li>

```

As you could see, we can pass in the `navLink` route's state or it also possible to omit the state, and then `navLink` itself will still handle the link.

Summing up, `navLink` works in the same way as `routerLink`. It consumes the string or array of strings. But first and foremost, this directive was created for navigation through route states and supporting dynamic parameters via states.

