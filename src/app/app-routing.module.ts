import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login.component';
import { ChatComponent } from './chat/chat.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'logout', component: LoginComponent, data: { 'login': false } },
  { path: 'register', component: LoginComponent, data: { 'register': true } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})

export class FirebasememoRoutingModule { }
