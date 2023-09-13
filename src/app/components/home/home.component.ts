import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../login/login.component';
import { GlobalEvents } from 'src/app/pubsub/events-enum';
import { EventFireHelper } from 'src/app/pubsub/event-fire.helper';

@Component({
  selector: 'pubsub-home',
  standalone: true,
  imports: [CommonModule, LoginComponent],
  styleUrls: ['./home.component.css'],
  template: `
    <div class="grid-container">
      <div>
        <pubsub-login></pubsub-login>
      </div>
      <div class="button-group">
        <button (click)="somethingButton()">
          I'm something to start an action
        </button>
      </div>
    </div>
  `,
})
export class HomeComponent implements OnInit {
  public ngOnInit(): void {
    EventFireHelper.fire(GlobalEvents.PAGE_VIEWED, [
      { pageName: 'Home Page', time: new Date() },
    ]);
  }

  protected somethingButton() {
    EventFireHelper.fire(GlobalEvents.BUTTON_CLICKED, [
      { data: `I'm something button or action.` },
    ]);
  }
}
