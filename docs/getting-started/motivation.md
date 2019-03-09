# Motivation

```typescript
export const routes: Routes = [
  {
    path: app.home.path,
    loadChildren: appRoute.home.lazy
  },
  {
    path: app.shop.path,
    loadChildren: appRoute.shop.lazy
  },
  {
    path: app.location.path,
    loadChildren: appRoute.location.lazy
  },
  {
    path: app.cart.path,
    component: ShoppingCartComponent
  }
];
```

## Foreword

Have you ever suffered because of the _magic strings_? I did 😤

Actually I was puzzled and stumped many times when I tried to come up with a convenient way out that could solve my problems 😵

So, I had tones of thoughts, but ultimately, I came up with a solution that simultaneously solves the problems of routes with declaration, navigation, and both providing general control, predictable results and stability

## Examples

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
    loadChildren: appRoute.home.lazy
  },
  {
    path: app.shop.path,
    loadChildren: appRoute.shop.lazy
  },
  {
    path: app.location.path,
    loadChildren: appRoute.location.lazy
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

Full integration with example is on **Integration** section

{% page-ref page="../integration/" %}

## Aftertaste

You might think \_\_it's all looks strange, it's easy to get confused in these variables, and we still declare magic strings somewhere. So where is the real impact? " - Don't hurry

Benefits worth it. Be sure to read the next section 👀

