import {Component, OnInit, ViewContainerRef} from '@angular/core';

import { DataService } from './data.service';
import {ConfigurationInterface} from './list/interfaces/configuration.interface';
import {NavBarItemInterface} from './nav-bar/interfaces/nav-bar-item.interface';
import {NotificationsService} from './notifications/notifications/notifications.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  data = null;
  config: ConfigurationInterface = {
    searchProps: ['name', 'brand', 'kind', 'price'],
    filterProps: [{value: 'brand', label: 'company'}, {value: 'kind', label: 'kind'}, {value: 'price', label: 'price'}],
    itemsPerPage: 5,
    pagination: true,
    selectedItemsAction: { label: 'Add to favourites', action: 'add' },
    showPrice: true
  };
  modalShow = false;

  starred = [];
  starredIds = {};

  starredConfig: ConfigurationInterface = {
    searchProps: ['name', 'company', 'kind', 'price'],
    filterProps: [],
    itemsPerPage: 5,
    pagination: true,
    selectedItemsAction: { label: 'Remove from favourites', action: 'remove' },
    showPrice: false
  };

  navBarOptions: Array<NavBarItemInterface> = [{label: 'Starred', action: 'favs', starIcon: true}];

  constructor(private dataService: DataService, private notificationsService: NotificationsService, private vcr: ViewContainerRef) {}

  ngOnInit() {
    this.dataService.getData().subscribe(
      data => this.data = data
    );
    this.notificationsService.init(this.vcr);
  }

  /**
   * Handles navbar action events
   * @param event
   */
  actionHandler(event) {
    switch (event) {
      case 'favs':
        this.modalShow = true;
      break;
    }
  }

  /**
   * Hides modal
   */
  hide() {
    this.modalShow = false;
  }

  /**
   * Handle main list actions
   * @param event
   */
  handleAction(event) {
    switch (event.action) {
      case 'add':
        this.addtoFavs(event.selectedItems);
        break;
      case 'remove':
        this.removeFromFavs(event.selectedItems);
        break;
    }
  }

  /**
   * Add items to starred list
   * @param items
   */
  addtoFavs(items: Array<Object>) {
    for (let i = 0; i < items.length; ++i) {
      if (!this.starredIds.hasOwnProperty(items[i]['id'])) {
        this.starredIds[items[i]['id']] = true;
        this.starred.push(items[i]);
      }
    }
    this.notificationsService.createMessage('Items added to favourites');
  }

  /**
   * Remove items from starred list
   * @param items
   */
  removeFromFavs(items: Array<Object>) {
    for (let i = 0; i < items.length; ++i) {
      delete this.starredIds[items[i]['id']];
      const index = this.starred.findIndex(x => x.id === items[i]['id']);
      this.starred.splice(index, 1);
    }
    this.starred = [...this.starred];
    this.notificationsService.createMessage('Items removed from favourites');
  }
}
