import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {SortingPropInterface} from './interfaces/sorting-prop.interface';

@Injectable()
export class SortingService {

  props: Array<SortingPropInterface> = [];
  sortField = null;
  sortDirection = null;
  sortChanged = new Subject();
  propsChanged = new Subject<Array<any>>();

  /**
   * Sets properties that are going to be checked for the sorting process
   * @param {Array<string>} props
   */
  setSortProps(props: Array<SortingPropInterface>) {
    this.props = props;
    this.propsChanged.next(this.props);
  }

  setSortingField(newField) {
    this.sortField = newField;
    this.updateSort();
  }

  setSortingDirection(newDirection) {
    this.sortDirection = newDirection;
    this.updateSort();
  }

  updateSort() {
    if (this.sortField !== null && this.sortField !== undefined && this.sortDirection !== null && this.sortDirection !== undefined) {
      this.sortChanged.next({field: this.sortField, direction: this.sortDirection});
    }
  }

  sort<T>(a: Array<T>): Array<T> {
    console.log('sorting...');
    if (this.sortField !== null && this.sortField !== undefined && this.sortDirection !== null && this.sortDirection !== undefined) {
      return a.sort(this.compare.bind(this));
    } else {
      return a;
    }
  }

  private compare(a, b): number {
    if (this.tryParseInt(a[this.sortField]) < this.tryParseInt(b[this.sortField])) {
      return this.sortDirection === 'ASC' ? -1 : 1;
    } else if (this.tryParseInt(a[this.sortField]) > this.tryParseInt(b[this.sortField])) {
      return this.sortDirection === 'ASC' ? 1 : -1;
    } else {
      return 0;
    }
  }

  private tryParseInt(str): number | string {
    if (!isNaN(str)) {
      return parseInt(str, 10);
    } else {
      return str;
    }
  }
}
