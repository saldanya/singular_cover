import {Component, Input, Output} from '@angular/core';
import {Subject} from 'rxjs/Subject';

import {SelectableInterface} from '../interfaces/selectable.interface';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: [ './list-item.component.scss' ]
})
export class ListItemComponent {
  @Input() item;
  @Input() currency = '€';
  @Input() showPrice = true;
  @Input() selected: number;

  @Output() selectionChange = new Subject<SelectableInterface>();

  imgKinds = {
    'Vida': 'life',
    'Hogar': 'home',
    'Coche': 'car',
    'Viaje': 'travel',
    'cybersecurity': 'cybersecurity',
    'Trabajo': 'work',
    'Salud': 'health'
  };

  /**
   * Toggle Selected items
   */
  toggleSelected() {
    this.selectionChange.next({ selected: !this.selected, id: this.item.id });
  }

  /**
   * get kind icon from a given kind
   * @param kind
   */
  getImageFromKind(kind: string): string {
    return `assets/images/kind_${this.imgKinds[kind]}.png`;
  }
}
