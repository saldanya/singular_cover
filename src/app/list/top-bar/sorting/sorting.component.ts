import {Component, OnInit} from '@angular/core';
import {SortingService} from './sorting.service';

@Component({
  selector: 'app-sorting',
  templateUrl: './sorting.component.html',
  styleUrls: ['./sorting.component.scss']
})
export class SortingComponent implements OnInit {
  items = [];
  sortingField = null;
  sortingDirection = null;

  constructor(private sortService: SortingService) {}

  ngOnInit() {
    this.items = this.sortService.props;
    this.sortService.propsChanged.subscribe(newProps => {
      this.items = newProps;
    });
  }

  sortFieldChanged(event) {
    this.sortingField = event.target.value;
    this.sortService.setSortingField(event.target.value);
  }

  sortDirectionChanged(event) {
    this.sortingDirection = event.target.value;
    this.sortService.setSortingDirection(event.target.value);
  }
}
