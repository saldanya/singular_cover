import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class PaginationService {

  private numberOfRecords = 0;
  currentPage = 0;
  recordsPerPage = 5;
  numOfRecordsChange = new BehaviorSubject<number>(this.numberOfRecords);
  currentPageChange = new BehaviorSubject<number>(this.currentPage);

  /**
   * Sets the number of records
   * @param {number} n
   */
  setNumOfRecords(n: number) {
    this.numberOfRecords = n;
    this.numOfRecordsChange.next(this.numberOfRecords);
  }

  /**
   * Gets an Observable for number of records changes
   * @returns {Observable<number>}
   */
  getNumOfRecords(): Observable<number> {
    return this.numOfRecordsChange;
  }

  /**
   * Returns the number of pages available
   * @returns {number}
   */
  getNumberOfPages(): number {
    return Math.ceil(this.numberOfRecords / this.recordsPerPage);
  }

  /**
   * Returns an observsable for current page changes
   * @returns {Observable<number>}
   */
  pageChange(): Observable<number> {
    return this.currentPageChange;
  }

  /**
   * sets the current page from n to n+1
   */
  next() {
    if (!this.isLastPage()) {
      this.currentPage++;
      this.currentPageChange.next(this.currentPage);
    }
  }

  /**
   * sets the current page from n to n-1
   */
  perv() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.currentPageChange.next(this.currentPage);
    }
  }

  /**
   * Sets the current page to n
   * @param n
   */
  goTo(n) {
    if (n >= 0 && n < this.numberOfRecords / this.recordsPerPage) {
      this.currentPage = n;
      this.currentPageChange.next(this.currentPage);
    }
  }

  /**
   * Sets current page to 0
   */
  goFirst() {
    this.currentPage = 0;
    this.currentPageChange.next(this.currentPage);
  }

  /**
   * Sets current page to the last page
   */
  goLast() {
    this.currentPage = Math.ceil(this.numberOfRecords / this.recordsPerPage) - 1;
    this.currentPageChange.next(this.currentPage);
  }

  /**
   * Returns true if it's last page
   * @returns {boolean}
   */
  isLastPage() {
    return this.currentPage === Math.ceil(this.numberOfRecords / this.recordsPerPage) - 1;
  }
}
