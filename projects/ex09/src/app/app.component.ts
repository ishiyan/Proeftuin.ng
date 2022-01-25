import { Component } from '@angular/core';
import { FormArray, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'ex09-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  hobbiesArray = new FormArray([new FormControl('', Validators.required)]);

  addInputControl() {
    this.hobbiesArray.push(new FormControl('', Validators.required));
  }

  removeInputControl(idx: number) {
    this.hobbiesArray.removeAt(idx);
  }
}