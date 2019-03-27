import {Component, Input, OnChanges, OnDestroy, OnInit, Output} from '@angular/core';
import {ListService} from './list.service';
import {Subscription} from 'rxjs/Subscription';
import {SelectableInterface} from './interfaces/selectable.interface';
import {ConfigurationInterface} from './interfaces/configuration.interface';
import {SearchService} from './top-bar/search/search.service';
import {SortingService} from './top-bar/sorting/sorting.service';
import {PaginationService} from './pagination/pagination.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: [ './list.component.css' ],
  providers: [ ListService, SearchService, SortingService, PaginationService ]
})
export class ListComponent implements OnInit, OnChanges, OnDestroy {
  @Input() data;
  @Input() currency = '€';
  @Input() config: ConfigurationInterface;

  @Output() action = this.listService.executeSelectedItemsAction;

  pagedData = null;
  dataSubscription: Subscription;

  constructor(public listService: ListService) {}

  ngOnInit() {
    this.dataSubscription = this.listService.getData().subscribe(data => {
      this.pagedData = data;
    });
  }

  ngOnChanges() {
    if (this.data !== null && this.data !== undefined && this.config !== null && this.config !== undefined) {
      this.listService.init(this.data, this.config);
    }
  }

  ngOnDestroy() {
    this.dataSubscription.unsubscribe();
  }

  /**
   * Changes selection
   * @param event
   * @param index
   */
  toggleSelected(event: SelectableInterface, index: number) {
    this.listService.changeSelection({ ...event, index: index});
  }

  /**
   * Checks if an item on the given index is selected
   * @param index
   */
  checkSelected(id: number): boolean {
    return this.listService.isSelected(id);
  }
}
