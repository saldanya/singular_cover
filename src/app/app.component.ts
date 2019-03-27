import { Component, OnInit } from '@angular/core';

import { DataService } from './data.service';
import {ConfigurationInterface} from './list/interfaces/configuration.interface';
import {NavBarItemInterface} from './nav-bar/interfaces/nav-bar-item.interface';

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

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getData().subscribe(
      data => this.data = data
    );
  }

  actionHandler(event) {
    console.log(event);
    if (event === 'favs') {
      this.modalShow = true;
    }
    console.log('show', this.modalShow);
  }

  hide() {
    this.modalShow = false;
  }

  handleAction(event) {
    console.log(event);
    switch (event.action) {
      case 'add':
        this.addtoFavs(event.selectedItems);
        break;
      case 'remove':
        this.removeFromFavs(event.selectedItems);
        break;
    }
  }

  addtoFavs(items: Array<Object>) {
    for (let i = 0; i < items.length; ++i) {
      if (!this.starredIds.hasOwnProperty(items[i]['id'])) {
        this.starredIds[items[i]['id']] = true;
        this.starred.push(items[i]);
      }
    }
  }

  removeFromFavs(items: Array<Object>) {
    console.log('items', items);
    for (let i = 0; i < items.length; ++i) {
      delete this.starredIds[items[i]['id']];
      const index = this.starred.findIndex(x => x.id === items[i]['id']);
      this.starred = [...this.starred.splice(index + 1, 1)];
    }
    console.log('starred', this.starred);
    console.log('starredids', this.starredIds);
  }
}
