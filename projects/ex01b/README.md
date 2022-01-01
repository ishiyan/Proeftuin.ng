# Create a responsive navbar in Angular using Flex Layout: part 2

Source: [blog](https://zoaibkhan.com/blog/create-a-responsive-toolbar-in-angular-using-flex-layout/), [github](https://github.com/thisiszoaib/responsive-toolbar), [twitter](https://twitter.com/zoaibdev).

As you can see in the `part 1`, our buttons compress into each other when we begin approaching the mobile size.
It would be nice if we can have more control over which buttons to show on this intermediary size (e.g. tablet).

We need to specify which menu item to show in the buttons menu or dropdown menu and on which screen sizes.
Let’s modify our menu item interface to accommodate this flexibility.

```ts
export interface MenuItem {
    label: string;
    icon: string;
    showOnMobile: boolean;
    showOnTablet: boolean;
    showOnDesktop: boolean;
}
```

Next, let’s update out menu items array.

```ts
menuItems: MenuItem[] = [
    {
      label: 'Sign Up',
      icon: 'login',
      showOnMobile: true,
      showOnTablet: true,
      showOnDesktop: true
    },
    {
      label: 'About',
      icon: 'help',
      showOnMobile: false,
      showOnTablet: true,
      showOnDesktop: true
    },
    {
      label: 'Pricing',
      icon: 'attach_money',
      showOnMobile: false,
      showOnTablet: false,
      showOnDesktop: true
    },
    {
      label: 'Docs',
      icon: 'notes',
      showOnMobile: false,
      showOnTablet: true,
      showOnDesktop: true
    },
    {
      label: 'Showcase',
      icon: 'slideshow',
      showOnMobile: false,
      showOnTablet: false,
      showOnDesktop: true
    },
    {
      label: 'Blog',
      icon: 'rss_feed',
      showOnMobile: false,
      showOnTablet: false,
      showOnDesktop: false
    },
  ];
  ```

We’re specifying the “Sign-up” menu item to appear at the top on all breakpoints.
In other words, it is getting the highest priority.
These items will be useful for most used features in any app.
Having prominent links to such features helps our users and ultimately the product in the end!

On the other hand, notice how the “Blog” section is never shown at the top.
This is just an example, but you can have unimportant sections in your apps,
which you need for completeness, but users don’t really need that much.
So this section will just appear in the menu as an additional option when users want (or go looking for it).

The only thing that’s left now is to actually add handling for this data to our templates.

```html
<mat-toolbar fxLayout="row" color="primary">
    <span fxFlex>Responsive Toolbar Demo</span>
    <button mat-button *ngFor="let item of menuItems" 
        [fxShow]="item.showOnDesktop" 
        [fxShow.xs]="item.showOnMobile"
        [fxShow.sm]="item.showOnTablet">
        <mat-icon class="mr">{{item.icon}}</mat-icon>
        {{item.label}}
    </button>
    <ng-container>
        <button mat-icon-button [matMenuTriggerFor]="dropMenu">
            <mat-icon>more_vert</mat-icon>
        </button>
        <mat-menu #dropMenu="matMenu">
            <ng-container *ngFor="let item of menuItems">
                <div [fxShow]="!item.showOnDesktop" 
                     [fxShow.sm]="!item.showOnTablet" 
                     [fxShow.xs]="!item.showOnMobile">
                    <button mat-menu-item>
                        <mat-icon class="mr">{{item.icon}}</mat-icon>
                        {{item.label}}
                    </button>
                    <mat-divider></mat-divider>
                </div>
            </ng-container>
        </mat-menu>
    </ng-container>
</mat-toolbar>
```

The only difference in this and the previous version is in how we’re now using the new properties we defined for each item and binding them with Flex Layout’s directives.

For the top buttons, we’re binding each item’s `fxShow` directive to the corresponding breakpoint.
As an example, `fxShow.xs` binds to `item.showOnMobile` – in other words, we’re telling the button for that item to only show on top on mobile, when it has `showOnMobile` to true. The logic is similar for desktop and tablet.
For the dropdown menu items, notice we’re not hiding or showing the “more” icon anymore, but instead adding more fine control over individual menu items.

This is the power of Flex Layout, where you can add a directive to virtually anything in the DOM.

For the dropdown menu items though, we use a reverse logic.
As an example, `fxShow.xs` binds to `!item.showOnMobile` – in other words, we’re telling the button for that item to only show in the dropdown on mobile, when it has `showOnMobile` to false. This is when the button would be hidden on top.

The result of these changes will be the menu items moving in and out of the top buttons and the dropdown menu as the screen size changes. When they are hidden on the top, they get added to the dropdown and reverse!
