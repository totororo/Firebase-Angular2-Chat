import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { PushNotificationsModule } from 'angular2-notifications'
import { AngularFireModule } from 'angularfire2';

import { AppService } from '../app.service';
import { throwIfAlreadyLoaded } from './module-import-guard';

export const firebaseConfig = {
    // TODO : change your firebase configuration.
    apiKey: '--',
    authDomain: '--',
    databaseURL: '--',
    storageBucket: '<YOUR_STORAGE>'
}

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        BrowserModule,
        PushNotificationsModule,
        AngularFireModule.initializeApp(firebaseConfig)
    ],
    exports: [
        CommonModule,
        FormsModule,
        BrowserModule
    ],
    providers: [AppService]
})

export class CoreModule {
    constractor( @Optional() @SkipSelf() parentModule: CoreModule) {
        console.log("CoreModule constructor::");
        throwIfAlreadyLoaded(parentModule, 'CoreModule');
    }
}