import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

import {PaginationService} from './pagination/pagination.service';
import {SelectableInterface} from './interfaces/selectable.interface';
import {SearchService} from './top-bar/search/search.service';
import {ConfigurationInterface} from './interfaces/configuration.interface';
import {SortingService} from './top-bar/sorting/sorting.service';
import {SelectedItemsActionInterface} from './interfaces/selected-items-action.interface';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class ListService {

  data = null;
  filteredData = [];
  pagedData = [];
  dataChanged = new BehaviorSubject<any>(this.pagedData);
  selectedItems = {};
  from = 0;
  to = 5;
  selectedItemsAction: SelectedItemsActionInterface;
  executeSelectedItemsAction = new Subject<{ action: string, selectedItems: Array<Object>}>();
  showPrice = true;

  constructor(private paginationService: PaginationService,
              private searchService: SearchService,
              private sortService: SortingService) {
    paginationService.pageChange().subscribe(currentPage => {
      if (this.data !== null) {
        this.setRange(currentPage);
        this.updateData(false);
      }
    });
    searchService.searchChanged.subscribe(x => {
      this.updateData(true);
    });
    sortService.sortChanged.subscribe(newSort => {
      this.updateData(true);
    });
  }

  /**
   * Sets data on initialisation
   * @param data
   * @param config
   */
  init(data: any, config: ConfigurationInterface) {
    this.data = data;
    this.filteredData = data;
    this.pagedData = data.slice(0, this.paginationService.recordsPerPage);
    this.dataChanged.next(this.pagedData);
    this.paginationService.setNumOfRecords(data.length);
    this.searchService.setSearchProps(config.searchProps);
    this.sortService.setSortProps(config.filterProps);
    this.selectedItemsAction = config.selectedItemsAction;
    this.showPrice = config.showPrice;
    this.selectedItems = {};
  }

  /**
   * Sets range for data filtering
   * @param currentPage
   */
  setRange(currentPage) {
    this.from = currentPage * this.paginationService.recordsPerPage;
    this.to = currentPage * this.paginationService.recordsPerPage + this.paginationService.recordsPerPage > this.data.length ?
      this.data.length : currentPage * this.paginationService.recordsPerPage + this.paginationService.recordsPerPage;
  }

  /**
   * updates data filtering
   */
  updateData(filtersChange: boolean) {
    let newData = [...this.filteredData];
    if (filtersChange) {
      this.paginationService.currentPage = 0;
      this.setRange(0);
      newData = this.searchService.search(this.data);
      newData = this.sortService.sort<object>(newData);
    }
    this.filteredData = newData;
    this.pagedData = newData.slice(this.from, this.to);
    this.dataChanged.next(this.pagedData);
    this.paginationService.setNumOfRecords(newData.length);
  }

  /**
   * Get an Observable for data changes
   * @returns {Observable<any>}
   */
  getData(): Observable<any> {
    return this.dataChanged;
  }

  /**
   * Changes selected items structure
   * @param {SelectableInterface} sel
   */
  changeSelection(sel: SelectableInterface) {
    if (sel.selected) {
      this.selectedItems[sel.id] = (this.paginationService.currentPage * this.paginationService.recordsPerPage) + sel.index;
    } else {
      delete this.selectedItems[sel.id];
    }
  }

  /**
   * Check if item on paged index is selected
   * @param index
   */
  isSelected(id: number): boolean {
    return (this.selectedItems.hasOwnProperty(id));
  }
}
