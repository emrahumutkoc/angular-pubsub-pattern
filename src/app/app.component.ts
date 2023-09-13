import { Component, OnInit } from '@angular/core';
import { PubSubService } from './pubsub/pub-sub.service';
import { GlobalEvents } from './pubsub/events-enum';

@Component({
  selector: 'app-root',
  template: ` <pubsub-home></pubsub-home> `,
})
export class AppComponent implements OnInit {
  constructor(protected pubSubService: PubSubService) {}

  // Define method of events
  private eventMap = {
    [GlobalEvents.PAGE_VIEWED]: (data: any) => {
      // Do the page viewed event action
      console.log(`${data?.pageName} is reviewed on ${data?.time}`);
    },
    [GlobalEvents.USER_LOGIN]: (data: any) => {
      // Do what ever you want.
      console.log(`${data.username} is logged in on ${data.time}`);
    },
    [GlobalEvents.BUTTON_CLICKED]: (data: any) => {
      console.log(`${data.data} from app.component.ts`);
    },
  };

  public ngOnInit(): void {
    const win = typeof window === 'undefined' ? null : window;
    // Initialize pub sub service
    this.pubSubService.init();

    // Subscribe events
    Object.values(GlobalEvents).forEach((key: string) => {
      if (this.eventMap[key] && win) {
        win['subscribeToAngularEvent'](key, (data) => this.eventMap[key](data));
      }
    });
  }
}
