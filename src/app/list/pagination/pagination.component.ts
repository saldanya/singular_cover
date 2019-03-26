import {Component, OnDestroy, OnInit} from '@angular/core';

import {PaginationService} from './pagination.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnDestroy {

  pages = [];
  recordsSubscription;

  constructor(public paginationService: PaginationService) {}

  ngOnInit() {
    this.recordsSubscription = this.paginationService.getNumOfRecords().subscribe(n => {
      const len = Math.ceil(n / this.paginationService.recordsPerPage);
      this.pages = new Array(len);
    });
  }

  ngOnDestroy() {
    this.recordsSubscription.unsubscribe();
  }
}
