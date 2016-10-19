import { Component } from '@angular/core';

import { AppService } from './app.service';
import { LoginService } from './auth/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  constructor(private appService: AppService) { }
}
