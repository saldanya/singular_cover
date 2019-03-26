import {SortingPropInterface} from '../top-bar/sorting/interfaces/sorting-prop.interface';
import {SelectedItemsActionInterface} from './selected-items-action.interface';

export interface ConfigurationInterface {
  searchProps: Array<string>;
  filterProps: Array<SortingPropInterface>;
  pagination: boolean;
  itemsPerPage: number;
  selectedItemsAction: SelectedItemsActionInterface;
  showPrice: boolean;
}
