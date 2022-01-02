import { Component, VERSION } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'ex05-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent  {
  name = 'Angular ' + VERSION.major;

  chipsControl = new FormControl('');
  chipsValue$ = this.chipsControl.valueChanges;
}
