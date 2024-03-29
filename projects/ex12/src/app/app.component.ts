import { Component, NgZone } from '@angular/core';

@Component({
  selector: 'ex12-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  progress: number = 0;
  label!: string;

  constructor(private ngzone: NgZone) {}

  // Loop inside the Angular zone
  // so the UI DOES refresh after each setTimeout cycle
  processWithinAngularZone() {
    this.label = 'inside';
    this.progress = 0;
    this.increaseProgress(() => console.log('Inside Done!'));
  }

  // Loop outside of the Angular zone
  // so the UI DOES NOT refresh after each setTimeout cycle
  processOutsideOfAngularZone() {
    this.label = 'outside';
    this.progress = 0;
    this.ngzone.runOutsideAngular(() => {
      this.increaseProgress(() => {
        // reenter the Angular zone and display done
        this.ngzone.run(() => { console.log('Outside Done!'); });
      });
    });
  }

  increaseProgress(doneCallback: () => void) {
    this.progress += 1;
    console.log(`Current progress: ${this.progress}%`);

    if (this.progress < 100) {
      window.setTimeout(() => this.increaseProgress(doneCallback), 10);
    } else {
      doneCallback();
    }
  }
}
