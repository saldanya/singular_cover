import { Injectable, ApplicationRef, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';

import { NotificationsComponent } from './notifications.component';

@Injectable()
export class NotificationsService {

  vcr: ViewContainerRef;

  constructor(private appRef: ApplicationRef, private resolver: ComponentFactoryResolver) { 
    console.log(appRef.components[0]);
  }

  init(vcr: ViewContainerRef) {
    this.vcr = vcr;
  }

  createMessage(msg: string) {
    const myFactory = this.resolver.resolveComponentFactory(NotificationsComponent);
    const nofiticationRef = this.vcr.createComponent(myFactory);
    nofiticationRef.instance.message = msg;
    setTimeout(() => {
      nofiticationRef.destroy();
    }, 2000);
  }

}