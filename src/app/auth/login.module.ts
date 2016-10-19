import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from 'angularfire2';
import { AuthProviders } from 'angularfire2';
import { AuthMethods } from 'angularfire2';
import { LoginComponent } from './login.component';
import { LoginService } from './login.service';
import { DatabaseService } from '../database/database.service';

@NgModule({
    imports: [
        BrowserModule
    ],
    providers: [LoginService, DatabaseService],
    declarations: [LoginComponent]
})

export class LoginModule { }