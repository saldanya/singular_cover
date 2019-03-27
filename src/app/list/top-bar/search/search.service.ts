import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class SearchService {

  searchString = '';
  props = [];
  searchChanged = new Subject<string>();

  /**
   * Sets properties that are going to be checked for the searching process
   * @param {Array<string>} props
   */
  setSearchProps(props: Array<string>) {
    this.props = props;
  }

  /**
   * Perform a search on a given array
   * @param {Array<any>} array
   * @returns {Array<any>}
   */
  search(array: Array<any>): Array<any> {
    if (this.searchString === '' || this.props.length === 0) {
      return array;
    }
    return array.filter(x => this.hasValueInProps(x));
  }

  /**
   * Changes the search string and emits event for search actions
   * @param {string} newString
   */
  changeSearchString(newString: string) {
    this.searchString = newString;
    this.searchChanged.next(newString);
  }

  /**
   * Checks if an object matches value for the given service props
   * @param {object} x
   * @returns {boolean}
   */
  private hasValueInProps(x: object): boolean {
    for (let i = 0; i < this.props.length; ++i) {
      if (x[this.props[i]] !== undefined && x[this.props[i]].toString().includes(this.searchString)) {
        return true;
      }
    }
    return false;
  }
}
