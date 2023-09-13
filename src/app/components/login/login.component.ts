import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EventFireHelper } from 'src/app/pubsub/event-fire.helper';
import { GlobalEvents } from 'src/app/pubsub/events-enum';

@Component({
  selector: 'pubsub-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrls: ['./login.component.css'],
  template: `
    <div class="login-container">
      <h1>Login</h1>
      <form (submit)="login()">
        <div class="input-container">
          <label for="username">Username:</label>
          <input type="text" id="username" />
        </div>
        <div class="input-container">
          <label for="password">Password:</label>
          <input type="password" />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  `,
})
export class LoginComponent {
  public login() {
    // when login action successfull.
    EventFireHelper.fire(GlobalEvents.USER_LOGIN, [
      { username: 'foo', time: new Date() },
    ]);
  }
}
