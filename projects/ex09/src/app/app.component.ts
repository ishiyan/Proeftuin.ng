import { Component } from '@angular/core';
import { UntypedFormArray, UntypedFormControl, Validators } from '@angular/forms';

@Component({
  selector: 'ex09-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  hobbiesArray = new UntypedFormArray([new UntypedFormControl('', Validators.required)]);

  addInputControl() {
    this.hobbiesArray.push(new UntypedFormControl('', Validators.required));
  }

  removeInputControl(idx: number) {
    this.hobbiesArray.removeAt(idx);
  }
}