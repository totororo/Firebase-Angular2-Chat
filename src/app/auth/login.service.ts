import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { AuthProviders } from 'angularfire2';
import { AuthMethods } from 'angularfire2';
import { EmailPasswordCredentials } from 'angularfire2/auth';
import { FirebaseAuthState } from 'angularfire2';

@Injectable()
export class LoginService implements OnInit, OnDestroy {
    authState: FirebaseAuthState;
    angularFireScribe = null;

    constructor(
        private angularFire: AngularFire) {

    }

    ngOnInit() {
        this.angularFireScribe = this.angularFire.auth.subscribe(state => {
            this.authState = state;
        });
    }

    getAuthState(): FirebaseAuthState {
        return this.authState;
    }

    googleLogin() {
        return this.angularFire.auth.login({
            provider: AuthProviders.Google,
            method: AuthMethods.Popup
        });
    }

    facebookLogin() {
        return this.angularFire.auth.login({
            provider: AuthProviders.Facebook,
            method: AuthMethods.Popup
        });
    }

    twitterLogin() {
        return this.angularFire.auth.login({
            provider: AuthProviders.Twitter,
            method: AuthMethods.Popup
        });
    }

    githubLogin() {
        return this.angularFire.auth.login({
            provider: AuthProviders.Github,
            method: AuthMethods.Popup
        });
    }

    mailLogin(user, password) {
        return this.angularFire.auth.login({
            email: user,
            password: password,
        }, {
                provider: AuthProviders.Password,
                method: AuthMethods.Password,
            });
    }

    anonymousLogin() {
        return this.angularFire.auth.login({
            provider: AuthProviders.Anonymous,
            method: AuthMethods.Anonymous,
        });
    }

    logout() {
        this.angularFire.auth.logout();
    }

    registerUser(userId, password) {
        let ep = { "email": userId, "password": password } as EmailPasswordCredentials;
        return this.angularFire.auth.createUser(ep);
    }

    ngOnDestroy() {
        console.log(" ondestroy login service.")
        if (this.angularFireScribe) {
            this.angularFireScribe.unscribe();
        }
    }
}


