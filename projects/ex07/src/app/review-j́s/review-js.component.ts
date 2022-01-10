import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { EllipsisDirective } from 'ngx-ellipsis';

@Component({
  selector: 'app-review-js',
  templateUrl: './review-js.component.html',
  styleUrls: ['./review-js.component.scss']
})
export class ReviewJsComponent {

@ViewChild(EllipsisDirective) ellipsisRef: EllipsisDirective | undefined;

  showMore = false;
  showMoreButton = false;

  constructor(private cd: ChangeDetectorRef) { }

  truncated(index: number) {
    this.showMoreButton = index === null;
  }

  showComplete() {
    if (this.ellipsisRef) {
      this.showMore = true;
      this.cd.detectChanges();
      this.ellipsisRef.applyEllipsis();
    }
  }
}
