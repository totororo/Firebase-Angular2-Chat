import { NgModule } from '@angular/core';

import { FirebasememoRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';
import { ChatModule } from './chat/chat.module';
import { LoginModule } from './auth/login.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CoreModule,
    ChatModule,
    LoginModule,
    FirebasememoRoutingModule,
  ],
  exports: [AppComponent],
  bootstrap: [AppComponent]
})

export class AppModule { }
