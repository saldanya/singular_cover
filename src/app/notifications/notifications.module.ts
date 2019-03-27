import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationsComponent } from './notifications/notifications.component';
import { NotificationsService } from './notifications/notifications.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [NotificationsComponent],
  providers: [NotificationsService],
  exports: [NotificationsComponent],
  entryComponents: [NotificationsComponent]
})
export class NotificationsModule { }
