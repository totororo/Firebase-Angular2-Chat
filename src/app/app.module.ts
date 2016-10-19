import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FirebasememoRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from './auth/login.module';
import { AngularFireModule } from 'angularfire2';
import { AppService } from './app.service';
import { ChatModule } from './chat/chat.module';
import { PushNotificationsModule } from 'angular2-notifications'
export const firebaseConfig = {
  // TODO : change your firebase configuration.
  apiKey: '<YOUR_API_KEY>',
  authDomain: '<YOUR_DOMAIN>',
  databaseURL: '<YOUR_DB>',
  storageBucket: '<YOUR_STORAGE>'
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    FirebasememoRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    PushNotificationsModule,
    LoginModule,
    ChatModule,

  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
