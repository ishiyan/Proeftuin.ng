import { Component, VERSION } from '@angular/core';

@Component({
  selector: 'ex07-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent  {
  name = 'Angular ' + VERSION.major;
}
