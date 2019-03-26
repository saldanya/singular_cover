import {Component, Input, Output} from '@angular/core';
import {Subject} from 'rxjs/Subject';

import {NavBarItemInterface} from './interfaces/nav-bar-item.interface';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  @Input() options: Array<NavBarItemInterface> = [];
  @Output() action = new Subject<string>();

  optionClicked(action) {
    this.action.next(action);
  }
}
