import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';

import { ListComponent } from './list.component';
import { ListItemComponent } from './list-item/list-item.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import {SortingComponent} from './top-bar/sorting/sorting.component';
import {SearchComponent} from './top-bar/search/search.component';
import {PaginationModule} from './pagination/pagination.module';
import {ActionsComponent} from './top-bar/actions/actions.component';

@NgModule({
  imports:      [ CommonModule, PaginationModule, FormsModule ],
  declarations: [ ListComponent, ListItemComponent, TopBarComponent, SortingComponent, SearchComponent, ActionsComponent ],
  exports:      [ ListComponent, ListItemComponent ]
})
export class ListModule { }
