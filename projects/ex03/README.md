# Create a responsive card grid with Angular Material using Flex Layout

Source: [blog](https://zoaibkhan.com/blog/create-a-responsive-card-grid-in-angular-using-flex-layout-part-1/), [github](https://github.com/thisiszoaib/card-view-demo.git), [twitter](https://twitter.com/zoaibdev).

Let’s now create a basic Angular Material card with some content in it.
It’s simple enough and I’ve used the example given on material components official docs.
Here is my version of the `app.component.html` with some changes.

```html
<mat-toolbar color="primary">
  Card view demo
</mat-toolbar>
<div class="content">
  <mat-card class="mat-elevation-z4">
    <mat-card-header>
      <mat-card-title>Himalayan Peaks</mat-card-title>
    </mat-card-header>
    <img mat-card-image src="./../assets/images/mountains.jpg">
    <mat-card-content>
      <p>
        The Himalayas is a mountain range in Asia.
      </p>
    </mat-card-content>
    <mat-card-actions>
      <button mat-button>LIKE</button>
      <button mat-button>SHARE</button>
    </mat-card-actions>
  </mat-card>
</div>
```

We’ve used a simple toolbar – with the primary color.
Then we’ve used the components and directives provided by the material card module to layout our content.
We’ve also added some styling in our `app.component.scss` and a `mat-elevation` class to the card to make the cards a bit more elevated.
Here is how our `app.component.scss` file looks like for now.

```scss
.content {
    padding: 16px;
}

.content > mat-card {
    width: 200px;
}
```

If you run ng serve now though, you’ll see a fixed width angular material card with suitable outside padding.

We want more of a card grid layout, rather than a single card and also a grid which is responsive i.e. adjusts itself to varying screen sizes.
Let’s go ahead and add the magic of flex layout to our cards.

Angular Flex layout provides us simple directives which we can apply to our containers and elements in the template to convert them into flexible containers.
Two of the most important ones are `fxLayout` and `fxFlex`.

`fxLayout` is used to specify whether flex layout should be used on the container.
Most commonly it can set to either `row` or `column` – depending on how you want to layout your nested elements inside it.

`fxFlex` is used to mark nested elements with the required widths and flexbox parameters.
We can specify pixel widths, percentage widths or even css calc expressions.
The syntax is very close to how flexbox works in css.

Let’s go ahead and add these two for our card grid.

```html
<div class="content">
<div fxLayout="row wrap">
  <div fxFlex="25%" *ngFor="let num of [1,2,3,4,5,6,7]">
    <mat-card class="mat-elevation-z4" >
      <mat-card-header>
        <mat-card-title>Mountains {{num}}</mat-card-title>
      </mat-card-header>
      <img mat-card-image src="./../assets/images/mountains.jpg">
      <mat-card-content>
        <p>
          The Himalayas is a mountain range in Asia.
        </p>
      </mat-card-content>
      <mat-card-actions>
        <button mat-button>LIKE</button>
        <button mat-button>SHARE</button>
      </mat-card-actions>
    </mat-card>
  </div>
</div>
</div>
```

We’ve added an `*ngFor` directive on a containing div to duplicate the single card into multiple with different numbers.
Then, we’ve set `fxLayout` to `row wrap` and `fxFlex` to `25%` (so that we get four cards in a row).
Also, we removed the fixed width for the card, since we’ll now be setting the width through the `fxFlex` directive.

Now we need to add some spacing to the card grid.
Let’s use `fxLayoutGap` directive for this purpose and add it to the parent container.

```html
<div fxLayout="row wrap" fxLayoutGap="16px">
```

Once we add it though, we see only three cards can be accommodated in a row (though we want four).
This is because the spacing increased the total width of the rows to more than 100%.

Angular Flex layout provides a neat little trick to resolve this issue.
We just need to add `grid` to our `fxLayoutGap` directive to tell flex layout this gap is meant for a grid with gutter.

```html
<div fxLayout="row wrap" fxLayoutGap="16px grid">
```

Under the hood, the `grid` directive actually applies a reverse negative margin on the container and for spacing between cards, adds some padding.
This is why we have an enclosing div for the `mat-card` component, otherwise the padding will apply to the `mat-card` element itself instead of outside it.

We now have a pretty decent looking material card grid for our app.

However, if you open up your Developer console and resize the screen, you’ll see that it’s not very responsive.
As you reduce the screen size, the cards reduce their width instead of their number and appear squeezed, not wrapping to the next line.

What we need is for the number of cards to reduce as the screen size changes.
On mobile sizes (the narrowest), there should only be one card per row, since there isn’t much space to accommodate more than that.

In order to add responsive behavior to our card grid layout, we’ll use flex layout’s responsive notation.
This can be added as a suffix to any directive.
In our case, we just need to append the breakpoint to our `fxFlex` directive and then specify the behavior we want at that breakpoint.

Already predefined breakpoints are `xs`, `sm`, `md`, `lg`.
`Xs` is used for mobile screen sizes, `sm` for close to tablet size screens and `md`, `lg` for desktop.
For more details about which screen sizes each breakpoint corresponds to refer to [this link](https://github.com/angular/flex-layout/wiki/Responsive-API).

For example, `fxFlex` will represent the default flex value, `fxFlex.xs` will represent the flex value (width) for mobile screens, `fxFlex.sm` will represent the value for tablet screens etc.
Simple enough? Let’s see some code.

```html
<div class="content">
<div fxLayout="row wrap" fxLayoutGap="16px grid">
  <div fxFlex="25%" fxFlex.xs="100%" fxFlex.sm="33%" *ngFor="let num of [1,2,3,4,5,6,7]">
    <mat-card class="mat-elevation-z4" >
      <mat-card-header>
        <mat-card-title>Mountains {{num}}</mat-card-title>
      </mat-card-header>
      <img mat-card-image src="./../assets/images/mountains.jpg">
      <mat-card-content>
        <p>
          The Himalayas is a mountain range in Asia.
        </p>
      </mat-card-content>
      <mat-card-actions>
        <button mat-button>LIKE</button>
        <button mat-button>SHARE</button>
      </mat-card-actions>
    </mat-card>
  </div>
</div>
</div>
```

Notice the `fxFlex.*` directives I’ve added.
For mobile screens, I want just one card in a row, so the width is 100%.
And for tablet sizes, I want it to be just three cards so we use 33% (100/3).

And voila! Run `ng serve ex03`, go into Developer tools and then see how the layout adjusts itself to screen size.

## Bonus: Change number of cards in a row dynamically

Let’s showcase more of the power of flex layout.
Keeping our layout directives in our templates like this (instead of CSS), we can actually make them dynamic in nature. So let’s create a column slider control which will allow users to change the number of cards in a row on desktop sizes.
Let’s first add a material slider control at the top.
For this we modify our toolbar in `app.component.html` to this.

```html
<mat-toolbar color="primary">
  <span>Card view demo</span>
  <div fxHide.lt-md>
    <span class="column-label">Columns</span>
    <mat-slider [max]="6" [min]="3" [(ngModel)]="gridColumns" [thumbLabel]="true">
    </mat-slider>
  </div>
</mat-toolbar>
```

First, we’ve introduced a new variable to specify the number of columns we want called gridColumns.
We’re using the ngModel directive to add two-way data binding to our slider control.
So whenever the slider control is updated, the gridColumns variable will be updated as well.
And vice versa!

Note also the `fxHide.lt-md` directive.
`fxHide` on its own will just hide the slider control from view, while with the `lt-md` suffix, it’ll only hide the control on less than medium screen sizes.
This is what we want, since we don’t want the column layout to change at those points.

This is another of the powerful directives the flex layout library provides us to control what to show and what not to, at different breakpoints according to our UI/UX preferences.

Also we did a bit of modification in our styles to move the button to the far right of the toolbar and also added a class for styling the columns caption.

```scss
mat-toolbar {
    justify-content: space-between;
}

.content {
    padding: 16px;
}

.content > mat-card {
    margin-bottom: 16px;
}

.column-label {
    margin-right: 8px;
    font-size: 1rem;
}
```

Let’s now look at our `app.component.ts` file.

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  gridColumns = 3;
}
```

Not much here except our declaration of the `gridColumns` variable to a default value of `3`.

To put it all together, let’s see what we did with the `fxFlex` binding on the template.

```html
<div [fxFlex]="(100/gridColumns) + '%'" fxFlex.xs="100%" fxFlex.sm="33%" *ngFor="let num of [1,2,3,4,5,6,7]">
```

Instead of providing a value directly, we’re adding the square braces around the directive to specify an expression with our variable.
This will compute to our flex value dynamically and will change as the variable changes value.
The calculation itself is pretty simple!

Note, we’re only doing this for the default `fxFlex`, since we only want it to affect the grid when on desktop size.
The great thing about flex layout is that you can add these breakpoint suffixes to just about any directive thus making it responsive.
So you can add expressions and variables for all breakpoints if that is what you need!

If you run `ng serve ex03` now and have a large enough screen size, you’ll see a column slider control.
When you change its value, our responsive card grid will also change, almost magically!

## How can we display different images?

For a more real world case, you should keep all data for the cards in an array.
This should include the image path as well.

```ts
cardData = [
  {
    title: ‘Title 1’,
    imageUrl: ‘assets/images/image1.png’
  },
  {
    title: ‘Title 2’,
    imageUrl: ‘assets/images/image2.png’
  },
]
```

Then in the `*ngFor` directive you’ll use this `cardData`.
And on line 14, you’d bind to the `imageUrl` in the source for the img tag.

```html
[src]="singleCardData.imageUrl"
```
