import { Component, VERSION } from '@angular/core';

@Component({
  selector: 'ex07-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Angular ' + VERSION.major;
}
