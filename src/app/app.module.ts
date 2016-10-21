import { NgModule } from '@angular/core';

import { FirebaseChatRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';
import { ChatModule } from './chat/chat.module';
import { LoginModule } from './auth/login.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CoreModule.forRoot(),
    ChatModule,
    LoginModule,
    FirebaseChatRoutingModule,
  ],
  exports: [AppComponent],
  bootstrap: [AppComponent]
})

export class AppModule { }
