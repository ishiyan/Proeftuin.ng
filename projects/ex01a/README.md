# Create a responsive navbar in Angular using Flex Layout: part 1

Source: [blog](https://zoaibkhan.com/blog/create-a-responsive-toolbar-in-angular-using-flex-layout/), [github](https://github.com/thisiszoaib/responsive-toolbar), [twitter](https://twitter.com/zoaibdev).

The `items` are defined in the `menu-item.interface.ts`.
They are re-used in both the buttons and drop-down menu.

```ts
export interface MenuItem {
    label: string;
    icon: string;
}
```

In the `responcive-toolbar.component.ts` we are just declaring an array of items.

```ts
@Component({
  selector: 'app-responsive-toolbar',
  templateUrl: './responsive-toolbar.component.html',
  styleUrls: ['./responsive-toolbar.component.scss']
})
export class ResponsiveToolbarComponent {

  menuItems: MenuItem[] = [
    {
      label: 'Sign Up',
      icon: 'login'
    },
    {
      label: 'About',
      icon: 'help'
    },
    {
      label: 'Pricing',
      icon: 'attach_money'
    },
    {
      label: 'Docs',
      icon: 'notes'
    },
    {
      label: 'Showcase',
      icon: 'slideshow'
    },
    {
      label: 'Blog',
      icon: 'rss_feed'
    },
  ];
}
```

The actual magic happens in `html template`.

```html
<mat-toolbar fxLayout="row" color="primary">
    <span fxFlex>Responsive Toolbar Demo</span>
    <button mat-button *ngFor="let item of menuItems" fxHide.xs>
        <mat-icon class="mr">{{item.icon}}</mat-icon>
        {{item.label}}
    </button>
    <button mat-icon-button [matMenuTriggerFor]="dropMenu" fxHide fxShow.xs>
        <mat-icon>more_vert</mat-icon>
    </button>
    <mat-menu #dropMenu="matMenu">
        <ng-container *ngFor="let item of menuItems">
            <button mat-menu-item>
                <mat-icon class="mr">{{item.icon}}</mat-icon>
                {{item.label}}
            </button>
            <mat-divider></mat-divider>
        </ng-container>
    </mat-menu>
</mat-toolbar>
```

- We have added a material toolbar component which contains everything.
- We’re using Flex Layout’s `fxLayout` directive to specify that everything in the container will be laid out in a row.
- We’ve an `*ngFor` directive which we’re using to create a button with icon for each menu item.
- We’ve a “more” button icon at the end of the row, which triggers a material dropdown menu containing our items.

We also have `fxHide` and `fxShow` in some places.
Basically, Flex Layout provides us with these directives and their breakpoint suffixes (such as `xs`, `sm` etc.) so that we can hide or show different elements at different screen sizes.

The behavior that we want is that the menu buttons should show when on desktop, but on mobile sizes, should all compress into a ‘more’ button and a dropdown menu.

For the top buttons, the default is they’ll be shown (we don’t need to specify), so we use `fxHide.xs` to hide them when on mobile. Conversely, the default for the dropdown menu would be hidden, so we use `fxHide`. But then we use `fxShow.xs` to show the icon button at mobile sizes.
