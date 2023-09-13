import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, NgZone, PLATFORM_ID } from '@angular/core';
import { GlobalEvents } from './events-enum';

@Injectable({
  providedIn: 'root',
})
export class PubSubService {
  private subscriptions: {
    [key: string]: Array<(...args: Array<any>) => void>;
  } = {};

  constructor(
    private zone: NgZone,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  public init() {
    Object.values(GlobalEvents).forEach((eventName) => {
      this.subscriptions[eventName] = [];
    });

    if (isPlatformBrowser(this.platformId)) {
      window['fireAngularEvent'] = (eventName, args) => {
        if (!this.subscriptions[eventName]) {
          throw new Error('Event has to be defined in the event list.');
        }

        this.zone.run(() => {
          this.fireEvent(eventName, args);
        });
      };

      window['subscribeToAngularEvent'] = (eventName, fn) => {
        this.subscribe(eventName, fn);
      };

      window['unsubscribeFromAngularEvent'] = (eventName) => {
        this.unsubscribe(eventName);
      };
    }
  }

  public subscribe(eventName: string, fn: (...args: Array<any>) => void) {
    if (this.subscriptions[eventName]) {
      this.subscriptions[eventName].push(fn);
    } else {
      this.subscriptions[eventName] = [fn];
    }

    return this;
  }

  public unsubscribe(eventName: string) {
    if (this.subscriptions[eventName]) {
      this.subscriptions[eventName] = [];
    }

    return this;
  }

  public fireEvent(eventName: string, args: Array<any>) {
    if (this.subscriptions[eventName]) {
      this.subscriptions[eventName].forEach((fn) => {
        fn.apply(null, args);
      });
    }

    return this;
  }
}
