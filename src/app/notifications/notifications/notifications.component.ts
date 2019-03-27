import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements AfterViewInit {

show = false;
message = 'notifications works!';

  constructor() { }

  ngAfterViewInit() {
    setTimeout(() => this.show = true, 100);
  }

}