# Create a multi select chips component with Angular Material

Source: [blog comments](https://zoaibkhan.com/blog/create-a-multi-select-chips-component-with-angular-material/), [github](https://github.com/thisiszoaib/multi-select-chips), [twitter](https://twitter.com/zoaibdev).

 I was going through the [material design spec document](https://material.io/components/chips) the other day and came across the ever so versatile material chips.
 They’re versatile in the sense that you can use them as action buttons, filter buttons or selection buttons depending on your use case.
 For instance, I wanted to use them as multi select chips.

However, upon going through the [Angular Material Components library](https://material.angular.io/components/chips/overview) I was a bit disappointed to see that apart from some basic functions, the chips component was not really useful.
A glaring issue was that it could not be used as a form control as other material components can.

So, I went about building my own version of a multi-select chips component on top of the existing material chips.
This would not only appear similar but also allow easy integration with Angular forms (both reactive and template).

The `chips-multi-select` component will have our options array as the input, so that we can display them as chips.
So let’s go ahead and add it to the `chips-multi-select.component.ts` file.

```ts
@Input() options: string[] = [];
```

Let’s add a material chips component now to its  `chips-multi-select.component.html` template file.

```html
<mat-chip-list>
    <mat-chip *ngFor="let option of options" [value]="option">
        {{option}}
    </mat-chip>
</mat-chip-list>
```

Nothing fancy here. Just an `*ngFor` directive looping through the options and display the same as a chip inside the material chips list.

Now let’s add the multiple selection behavior to the chips.
The first modification we’ll do is pretty simple and involves adding two directives like below.

```html
<mat-chip-list selectable multiple>
...
</mat-chip-list>
```

This will allow us to set multiple chips in the list as selected.
How do we select the chips though?
We can do so by adding the selected directive to the specific chip in our template.

But we want this to happen when the user clicks the chip, so we’ll do this dynamically instead.
Let’s make the following changes to our component.

```html
<mat-chip-list selectable multiple>
    <mat-chip #c="matChip" *ngFor="let option of options" [value]="option" (click)="toggleSelection(c)">
        {{option}}
    </mat-chip>
</mat-chip-list>
```

For each our our chips, we’ve simply given a template variable to the matChip export so we can pass this to our click event handler.
The click handler uses the `toggleSelected()` function of the chip class and this causes the state of the chip to change.

```ts
toggleSelection(chip: MatChip) {
   chip.toggleSelected();
}
```

Visually, the selected chip uses the primary color of your theme to stand out from the normal unselected chips.
To test the component, we’re just passing in a simple options array that could be used for an ecommerce store.

This is enough for our needs probably, but let’s add an icon to the selected chips as well.

```html
<mat-chip #c="matChip" *ngFor="let option of options" [value]="option">
        <mat-icon *ngIf="c.selected">check</mat-icon>
        {{option}}
</mat-chip>
```

To do this, we’ve added an `*ngIf` directive to the icon and are checking for the selected property of the material chip through its template reference `c`.
To smooth out the visual look, we’ll also add a bit of styling to the component’s style file.

```scss
mat-icon {
    height: 20px;
    width: 20px;
    font-size: 20px;
    margin-right: 5px;
}
```

Nothing much, just added some spacing and adjusted the size of the icon.

Now that we have our appearance and a part of the functionality all set, let’s move on to converting this into a proper Angular Form Control.

Though our multi-select chips component looks and behaves well in terms of selection, but there doesn’t seem to be any clean way to get the selected values when working with Angular forms (both template-driven and reactive).
Fortunately, Angular provides us an interface called `ControlValueAccessor` which will help us convert our component into a proper Angular Form Control.
When we’re done, you can integrate the chips component with your other components using Angular forms and the `[formControl]` directive.

Let’s go ahead and implement the interface in our custom chips `chips-multi-select.component.ts` component.

```ts
export class ChipsMultiSelectComponent
 implements OnInit, ControlValueAccessor {

  writeValue(value: string[]): void {
}

  registerOnChange(fn: any): void {
}

  registerOnTouched(fn: any): void {
}

  setDisabledState?(isDisabled: boolean): void {
}

}
```

When you use your IDE’s feature to add the required functions for the interface, you’ll get four empty functions in your component.
Let’s go through each of them a bit to get a better understanding and add the required functionality for our component.

`registerOnChange` and `registerOnTouched`: let’s first get these two functions out of the way since, they’ll be pretty short (or empty).

So both of these are used to register change event handlers when the form control is initialized.
These handlers can then be called when needed from within the component to specify when the component’s value has changed or when the component has been touched (e.g. when an input control loses focus).
For our case, we don’t need to specify if our multi-select chips component was touched, so we’ll leave this function empty.
For registering the change event, we’re simply going to save the function passed in as parameter in our component as `onChange`.

```ts
onChange!: (value: string[]) => void;

registerOnChange(fn: any): void {
    this.onChange = fn;
}

propagateChange(value: string[]) {
    if (this.onChange) {
      this.onChange(value);
    }
}
```

Note the addition of an extra function `propagateChange`.
This is just so we can check for the `onChange` function as to whether it does exist, before calling it to propagate the value.

We’ll soon be using this function to send our value changes.
But before that, let’s go through the `writeValue` function quickly.

The `writeValue` function is triggered in two cases:

- When your Form Control is given an initial value on declaration.
- When you use the setValue or patchValue function of the control to give it a value.

In our case, it’ll simply have an array of strings (representing the selected option values) in the parameter.
We’ll save this value for future reference and also update our chips list to show this selection.

```ts
@ViewChild(MatChipList)
 chipList!: MatChipList;
value: string[] = [];

writeValue(value: string[]): void {
    // When form value set when chips list initialized
    if (this.chipList && value) {
      this.selectChips(value);
    } else if (value) {
      // When chips not initialized
      this.value = value;
    }
}

selectChips(value: string[]) {
    this.chipList.chips.forEach((chip) => chip.deselect());

    const chipsToSelect = this.chipList.chips.filter((c) =>
      value.includes(c.value)
    );

    chipsToSelect.forEach((chip) => chip.select());
  }
```

That’s a bit of code, so let’s go through it step by step.

First, we’ve added variable to store the value and are setting that value in the function.
This is only needed when the chips list has not initialized yet on the UI.
Because once it’s initialized, we simply set its selection, which in turn updates the value as well (because of the chips change event handler).

Secondly, in case the chips list has initialized, we go ahead and select the chips and for that purpose I’ve added a `selectChips` function.
It uses the `MatChip` API calls to first deselect all and then select the specific chips according to the array value passed in.

To get the `MatChipList` component, we’re using the `ViewChild` decorator.

We’ve now specified how the value coming in should be used to update the UI.
Now we need to specify the reverse i.e. how to send the selection changes and new value back.
For this, we’ll implement the `MatChipList` selection change event.
This event fires off when any of the chips within the list are selected or deselected which is perfect for our needs.
Since, the material chips list is not initialized when `ngOnInit` is called, we’ll need to add this event handler to `ngAfterViewInit`.

```ts
ngAfterViewInit() {
    this.chipList.chipSelectionChanges
      .pipe(
        untilDestroyed(this),
        map((event) => event.source))
      .subscribe((chip) => {
        if (chip.selected) {
          this.value = [...this.value, chip.value];
        } else {
          this.value = this.value.filter((o) => o !== chip.value);
        }

        this.propagateChange(this.value);
      });
  }
```

Looks a bit complex, but it isn’t!
It’s just using `RxJS` to simplify our flow.
Here’s what we’re doing in short.

- Getting the source chip for the current selection change.
- If the chip is selected, adding it to the current value of the component (using the spread operator to ensure immutability).
- If the chip has been deselected, using the filter function on the values to remove it from the values (again ensuring immutability).
- Propagating the changed value using our already created function!

Not that difficult now, was it?

Lastly, we just need to add one statement before we set this up to select the chips based on the current value.
This is done to cover the case when we’re sending the initial value of the form control.
Since the chips list has not been initialized on the UI at that point, we need to do it in `ngAfterViewInit` as well.

```ts
ngAfterViewInit() {
    this.selectChips(this.value);

    this.chipList.chipSelectionChanges...
    // Rest of code
}
```

Since we’re subscribing to an event here we also need to unsubscribe to prevent memory leaks.

I’m using my favorite way here: the `@ngneat/until-destroy` library.
You can use your own way, as long as it works.

At this point, you should’ve a functioning form control to work with.
This last `setDisabledState` function can be used to add handling for when the control is disabled or not.
In our case, we’ll simply save a variable for this and use it to set the disabled state of the material chips list.
Also, we’ll disable the click handler so the user can’t change anything.

```ts
disabled = false;

setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
}

toggleSelection(chip: MatChip) {
    if (!this.disabled) chip.toggleSelected();
}
```

The last step in converting our component to a form control is to properly inform Angular about it, so that the framework can recognize that it is indeed an Angular Form Control.
We do this by specifying the component in the `providers` array as an `NG_VALUE_ACCESSOR`.

```ts
@Component({
  selector: 'app-chips-multi-select',
  templateUrl: './chips-multi-select.component.html',
  styleUrls: ['./chips-multi-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ChipsMultiSelectComponent,
      multi: true,
    },
  ],
})
```

There is no space here to go into much detail about Angular’s Dependency Injection and the concepts associated with it.
But here it’s enough to say that we’re essentially registering our component as a form control, so Angular knows where to look for when binding with the Forms API.

If you’d like to go more in depth into Angular’s DI system, check out the [official documentation](https://angular.io/guide/dependency-injection-providers).

Let’s test it all out to see everything in action.

I’ve added our custom multi-select chips component to our app’s base component along with a checkbox to toggle disability, a button to see whether we can set the form control’s value correctly and a value section to show the current value of the control.

```html
<div class="content">
  <app-chips-multi-select [options]="options" [formControl]="chipsControl">
  </app-chips-multi-select>

  <mat-divider></mat-divider>

  <h3>Value: {{chipsControlValue$ | async}}</h3>

  <mat-divider></mat-divider>

  <mat-checkbox [formControl]="disabledControl">Disabled</mat-checkbox>

  <mat-divider></mat-divider>

  <button mat-raised-button (click)="setChipsValue()">Patch Value</button>

</div>
```

Since this is fairly routine, I’m going to skip the component code here.

If you test out now, you’ll see all our form control functions and multiple selection on the chips working as it should.
