# Simple sidenav

Source: [github](https://github.com/codica2/simple-sidenav).

A simple, easily customizable, animated menu, with the possibility of infinite nesting.

## app.component.html

```html
<ex11-simple-sidenav
  [menu]="menu"
  [activeID]="'2'"
  [animation]="animation"
  [withArrow]="true"
  (onSidenav)="onClick($event)">
</ex11-simple-sidenav>
```

## `[menu]` prop example

```ts
menu: SimpleSidenav[] = [
  { "id": "1", "name": "Ruby on Rails", "icon": "assets/images/rails.png", "menu": [
    { "id": "1", "name": "Models", "menu": [
      { "id": "1", "name": "Active Record Basics" },
      { "id": "2", "name": "Active Record Migrations" },
      { "id": "3", "name": "Active Record Validations" },
      { "id": "4", "name": "Active Record Callbacks" },
      { "id": "5", "name": "Active Record Associations" },
      { "id": "6", "name": "Active Record Query Interface", "menu": [...] }
    ] },
    ] },
  { "id": "2", "name": "Angular", "icon": "assets/images/angular.png", "menu": [...] },
  ...
]
```

## `[activeID]` prop example

If you want menu to be opened by default at some position just pass an id of menu item to `[activeID]` prop.

```ts
[activeID]="'yourMenuItemID'"
```

## `[animation]` prop example

We have two types of animation, `in` and `out`.
Value is a name of animation.
Duration is an optional parameter that shows how long the animation should work.

For `in`: we have two animations for choice `slide-in` | `slide-in-stagger`.

For `out`: just one `slide-out`.

```ts
{
  "in": { "value": "slide-in-stagger" },
  "out": { "value": "slide-out", "duration": "200" }
}
```

If you don’t want any animations - just pass false into `[animation]="false"`.

## API

| Props           | Default value | Interface                   | Description                                                                          | Required |
| --------------- | ------------- | --------------------------- | ------------------------------------------------------------------------------------ | -------- |
| `[menu]`        | `none`        | ```SimpleSidenav[]```          | See example above.                                                                   | `true` |
| `[animation]`   | `false`       | ```SimpleAnimation```       | Pass object with animation name. See example above.                                 | `false`|
| `(onSidenav)`   | `----`        | ```--------```              | Pass callback function to listen for sidenav clicks. `$event` contains an `id` and `index` of the clicked element.|`false`|
| `[animate]`     | `false`       | ```boolean```               | Set to true if you want to animate the first appearance of the sidenav.                  | `false`|
| `[withArrow]`   | `true`        | ```boolean```               | Set to false if you want to hide an arrow icon.                                         | `false`|
| `[activeID]`    | `none`        | ```string```                | Pass an ID of menu item if you want it to be opened by default.                         | `false`|
