import { Component } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { tap } from 'rxjs/operators';

@UntilDestroy()
@Component({
  selector: 'ex05-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  options = ['Clothing', 'Shoes', 'Electronics', 'Books', 'Magazines'];

  chipsControl = new UntypedFormControl(['Books']);

  chipsControlValue$ = this.chipsControl.valueChanges;

  disabledControl = new UntypedFormControl(false);

  setChipsValue() {
    this.chipsControl.setValue(['Shoes', 'Electronics']);
  }

  ngOnInit() {
    this.disabledControl.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe((val) => {
        if (val) this.chipsControl.disable();
        else this.chipsControl.enable();
      });
  }
}