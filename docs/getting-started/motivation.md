# Motivation

## Foreword 🤔 

Have you ever suffered because of the _magic strings_? I did 😤 

Actually I was puzzled and stumped many times when I tried to come up with a convenient way out that could solve my problems 😵 

So, I had tones of thoughts, but ultimately, I came up with a solution that simultaneously solves the problems of routes with declaration, navigation, and provides general control, predictable results and stability 😌 

## Examples 👨💻 

Looks familiar, right?

```typescript
export const routes: Routes = [
  {
    path: '',
    loadChildren: 'app/home/home.module#HomeModule'
  },

  {
    path: 'shop',
    loadChildren: 'app/shop/shop.module#ShopModule'
  },
  {
    path: 'location',
    loadChildren: 'app/location/location.module#LocationModule'
  },
  {
    path: 'cart',
    component: ShoppingCartComponent
  }
];
```

```markup
<a [routerLink]="['/shop', 'accessories']">Accessories</a>
```



Okay, but what if I say that you can do the same thing in a more convenient and manageable manner? 🤔 

Let's take a look 🔭 

```typescript
export const routes: Routes = [
  {
    path: app.home.path,
    loadChildren: appRoute.home.lazyPath
  },
  {
    path: app.shop.path,
    loadChildren: appRoute.shop.lazyPath
  },
  {
    path: app.location.path,
    loadChildren: appRoute.location.lazyPath
  },
  {
    path: app.cart.path,
    component: ShoppingCartComponent
  }
];
```

```markup
<a [routerLink]="shop.accessories.path">Accessories</a>
```

## Aftertaste

You may ask: “_Okay, but it all looks strange, it's easy to get confused in these variables, and we still declare magic strings somewhere. So where is the real impact?_ " 😕🤨 

And the answer is: "_Do not hurry!_ " 😉

Benefits worth it. Be sure to read the next section 👀 

