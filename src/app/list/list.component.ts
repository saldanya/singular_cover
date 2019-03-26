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

  filteredData = null;
  dataSubscription: Subscription;

  constructor(public listService: ListService) {}

  ngOnInit() {
    console.log('init');
    this.dataSubscription = this.listService.getData().subscribe(data => {
      console.log(data);
      this.filteredData = data;
    });
  }

  ngOnChanges() {
    console.log('change');
    if (this.data !== null && this.data !== undefined && this.config !== null && this.config !== undefined) {
      this.listService.init(this.data, this.config);
    }
  }

  ngOnDestroy() {
    this.dataSubscription.unsubscribe();
  }

  toggleSelected(event: SelectableInterface, index: number) {
    this.listService.changeSelection({ ...event, index: index});
  }
}
