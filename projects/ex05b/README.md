# Angular Material multi-select chips

Source: [blog](https://zoaibkhan.com/blog/create-a-multi-select-chips-component-with-angular-material/), [stackblitz](https://stackblitz.com/edit/angular-ivy-fo2gjf?file=src%2Fapp%2Fapp.component.html), [twitter](https://twitter.com/zoaibdev).

Hi Zoaib. Thanks for the article. I’ve had issues with how click selection worked as well.

Have you checked the source code?
`MatChipList` does implement `ControlValueAccessor`.
[See here](https://github.com/angular/components/blob/11.1.1/src/material/chips/chip-list.ts#L102-L103).

The components are accessible, and selecting a chip by pressing SPACE works by default and does update the control’s value.
See [_handleKeydown](https://github.com/angular/components/blob/11.1.1/src/material/chips/chip.ts#L391).

I would have expected selection by click to also work by default, but that is not the case.
See [_handleClick](https://github.com/angular/components/blob/11.1.1/src/material/chips/chip.ts#L382) – it only stops event propagation.

Hence, to enable selecting chips by click, we need to call `toggleSelected` on `MatChip`.
The method has a parameter called `isUserInput`, defaulted to `false`.
See [here](https://github.com/angular/components/blob/11.1.1/src/material/chips/chip.ts#L353-L358).

`MatChipList` will only update its control value if you pass true there
See [here](https://github.com/angular/components/blob/11.1.1/src/material/chips/chip-list.ts#L746-L748) and 
[here](https://github.com/angular/components/blob/11.1.1/src/material/chips/chip-list.ts#L650).

This made it work for me.

```html
<mat-chip #chip="matChip" (click)="toggleSelection(chip, $event)" …
```

```ts
presents = new FormControl([]);

toggleSelection(chip: MatChip, event: MouseEvent) {
if (chip.selectable && !chip.disabled) {
chip.toggleSelected(true);
}
event.stopPropagation();
}
```

------

Thanks for your detailed comment.
I just tested on a [stackblitz](https://stackblitz.com/edit/angular-ivy-fo2gjf?file=src/app/app.component.html) and you’re correct that the Form Control works when using `toggleSelected` with `true`.

Wish I had known that or it was mentioned in the offical docs at least, especially since all other components work just like that (without special config).

In the stackblitz I also tested it with a form field – perhaps the out of the box keyboard input selection is meant to be used with a form field.
