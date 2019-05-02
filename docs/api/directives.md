# Directives

## Navigation

Routeshub offers directive `navLink` for navigation. It is extended by `routerLink` and doing the same as `routerLink` except one thing. `navLink` helps to manage dynamic paths \(parameters\) more productive.

#### Use example:

```markup

<!--string format-->
<li navLink="{{ slices.appSlice.root.state }}">Home</li>
<!--array format-->
<li [navLink]="slices.aboutSlice.root.state">About</li>
<!--array with params-->
<li [navLink]="slices.userSlice.profile.state" 
    [navParams]="{id: USER_ID}">
    Profile
</li>


<!--just as example. Don't use navLink like that.-->
<li [navLink]="['/', 'account', ACCOUNT_ID]">
    Account
</li>

```

As you can see, `navLinks` works in the same way as `routerLink`. It consumes the string or array of strings. But first and foremost, this directive was created for navigation through route states and supporting dynamic parameters.

