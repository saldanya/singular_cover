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

  isDisplayed(): boolean {
    return this.searchService.props.length > 0;
  }
  getSearchFields(): string {
    return 'search by ' + this.searchService.props.join(', ') + '...';
  }

  /**
   * Form submission handler for search
   * @param {string} text
   */
  onSubmit() {
    this.searchService.changeSearchString(this.model.searchString);
  }
}
