import {Component} from '@angular/core';

import {ListService} from '../../list.service';
import {SelectedItemsActionInterface} from '../../interfaces/selected-items-action.interface';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent {

  constructor(private listService: ListService) {}

  /**
   * Gets the number of selected items
   */
  getSelectedLength(): number {
    return Object.keys(this.listService.selectedItems).length;
  }

  /**
   * Gets the action to be executed
   */
  getAction(): SelectedItemsActionInterface {
    return this.listService.selectedItemsAction;
  }

  /**
   * Handler for actions, to send an event when an action is triggered
   */
  actionHandler() {
    const selected = [];
    for (const i in this.listService.selectedItems) {
      if (this.listService.selectedItems.hasOwnProperty(i)) {
        selected.push(this.listService.filteredData[this.listService.selectedItems[i]]);
      }
    }
    this.listService.executeSelectedItemsAction.next(
      { action: this.listService.selectedItemsAction.action, selectedItems: selected }
      );
    this.listService.selectedItems = {};
  }
}

