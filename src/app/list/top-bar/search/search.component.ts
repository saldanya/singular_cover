import {Component} from '@angular/core';

import {SearchService} from './search.service';

@Component({
  selector: 'app-search',
  templateUrl: 'search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  model = { searchString: '' };

  constructor(private searchService: SearchService) {}

  /**
   * Returns true when container should be displayed
   */
  isDisplayed(): boolean {
    return this.searchService.props.length > 0;
  }

  /**
   * Return a string with the search fields comma separated
   */
  getSearchFields(): string {
    return 'search by ' + this.searchService.props.join(', ') + '...';
  }

  /**
   * Form submission handler for search
   */
  onSubmit() {
    this.searchService.changeSearchString(this.model.searchString);
  }
}
