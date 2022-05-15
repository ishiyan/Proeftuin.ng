import {Component, Input, ViewEncapsulation, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { fadeIn, fadeOut, rotate } from './animations/animations';
import { SimpleSidenav } from './interfaces/simple-sidenav';
import { SimpleAnimation } from './interfaces/simple-animation';

@Component({
  selector: 'ex11-simple-sidenav',
  templateUrl: './simple-sidenav.component.html',
  styleUrls: ['./simple-sidenav.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [fadeIn, fadeOut, rotate]
})
export class SimpleSidenavComponent implements OnChanges {
  @Input() menu: SimpleSidenav[] = [];
  @Input() show: boolean = true;
  @Input() animation: SimpleAnimation = {};
  @Input() animate: boolean = false;
  @Input() withArrow: boolean = true;
  @Input() activeID = 0;
  @Output()
  onSidenav: EventEmitter<{
    id: string|number,
    name: string,
    icon: string,
    index: number
  } | null> = new EventEmitter<{
    id: string|number,
    name: string,
    icon: string,
    index: number
  } | null>();

  activeOne: SimpleSidenav = {};

  ngOnChanges(changes: SimpleChanges): void {
    this.activeOne = {};

    if (changes['activeID'] && changes['activeID'].currentValue) {
      this.activeID = changes['activeID'].currentValue;
      this.activeID && this.menu && this.findActive();
    }
  }

  onNavClick({ id, name, icon }: SimpleSidenav, index: number): void {
    if (this.activeOne.id === id && this.activeOne.menu) {
      this.activeOne = {};
      this.onSidenav.emit(null);
      return;
    }

    this.onSidenav.emit(<any>{ id, name, icon, index });
    this.activeOne = { id, name, icon };

    if (this.menu[index].menu) { this.activeOne.menu = this.menu[index].menu }
  }

  findActive(): void {
    this.menu.forEach((item: SimpleSidenav) => {
      if (item.id === this.activeID || this.hasActive(item.menu!)) {
        this.activeOne = item;
        return;
      }
    });
  }

  hasActive(menu: SimpleSidenav[]): boolean {
    return menu && menu.some(item => item.id === this.activeID || this.hasActive(item.menu!));
  }
}
