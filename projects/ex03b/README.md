# Fastest way to make a responsive card grid with CSS

Source: [blog](https://zoaibkhan.com/blog/fastest-way-to-make-a-responsive-card-grid-with-css/), [stackblitz](https://stackblitz.com/edit/quick-responsive-grid?file=index.html), [twitter](https://twitter.com/zoaibdev).

A few months ago I wrote about how to set up a responsive card grid using the Angular Flex Layout library.

I mentioned in that post that you could use CSS for the same type of grid.
I had media queries in mind, which is the standard way of responsive web design using CSS.

However, shortly after, I came across a pretty nifty trick using CSS grid which effectively makes a responsive card grid much faster and quicker!
And without any media queries.

So here’s a code snippet.

```scss
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}
```

That’s it!

Three lines of CSS code.
And whatever comes nested in this style, will be arranged in a responsive grid.
It can be a card, graphics, text boxes, anything.

The `display` property simply converts the layout to use CSS grid.

`grid-template-columns` is used to specify the number of columns and their widths for your grid.
However, here we’re using some clever syntax to make it dynamic.

We’re using `repeat` with `auto-fill`, which means the number of columns will be as needed.
What will it depend on?
Not one value, but a range using `minmax` function.

What this means is that the minimum the card width can be squeezed is up to 200px (you can modify as you wish).
When you resize the screen/browser, as soon as the cards squeeze to 200px, it will move one card to the next row and reduce the columns.
In that case, the maximum value of `1fr` will come into effect and equally distribute the widths.

Since I’ve learnt about this, I tend to lean towards this way of setting up a responsive card grid!
