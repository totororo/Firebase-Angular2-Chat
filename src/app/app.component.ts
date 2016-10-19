import { Component } from '@angular/core';
import { AppService } from './app.service';
import { LoginService } from './auth/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'app works!';
  constructor(private appService: AppService) { }


}
