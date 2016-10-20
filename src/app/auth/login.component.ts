import { Component, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FirebaseListObservable } from 'angularfire2';

import { LoginService } from './login.service';
import { DatabaseService } from '../database/database.service';
import { User } from '../object/user.object';
import { AppService } from '../app.service';


const MAIL = 1;
const TWITTER = 2;
const FACEBOOK = 3;
const GOOGLE = 4;
const GITHUB = 5;

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnDestroy {

    titleMessage = undefined;
    userId = undefined;
    displayName = undefined;
    photoURL = undefined;

    email = "demo@demo.com";
    password = "demodemo";
    error = undefined;
    isRegister = false;
    userProfileSubscribe = null;
    // test
    userItems: Array<User>;

    constructor(private loginService: LoginService,
        private databaseService: DatabaseService,
        private appService: AppService,
        private route: ActivatedRoute,
        private router: Router) {
        this.titleMessage = "Please Sign In";

        this.userProfileSubscribe = this.databaseService.userProfiles().subscribe(obj => {
            this.userItems = obj;
        });

        // logout
        this.route.data.subscribe(value => {
            let d = JSON.parse(JSON.stringify(value));
            // logout
            if (d.login == false) {
                this.logout();
                this.appService.user = null;
                return;
            }
            if (d.register == true) {
                this.register();
            }
        });

        if (this.appService.user != undefined) {
            this.router.navigate(['chat']);
        }
    }

    login(index: number) {
        this.error = undefined;
        switch (index) {
            case MAIL:
                this.loginService.mailLogin(this.email, this.password).then((user) => {
                    this.setData(user);
                }).catch((error) => {
                    this.errorHandler(error);
                });
                break;
            case TWITTER:
                this.loginService.twitterLogin().then((user) => {
                    this.setData(user);
                }).catch((error) => {
                    this.errorHandler(error);
                });
                break;
            case FACEBOOK:
                this.loginService.facebookLogin().then((user) => {
                    this.setData(user);
                }).catch((error) => {
                    this.errorHandler(error);
                });
                break;
            case GOOGLE:
                this.loginService.googleLogin().then((user) => {
                    this.setData(user);
                }).catch((error) => {
                    this.errorHandler(error);
                });
                break;
            case GITHUB:
                this.loginService.githubLogin().then((user) => {
                    this.setData(user);
                }).catch((error) => {
                    this.errorHandler(error);
                });
                break;
            default:
                break;
        }
    }

    setData(user) {
        this.titleMessage = "Login Success.";
        this.userId = user.uid;
        this.displayName = user.auth.displayName;
        this.photoURL = user.auth.photoURL;

        /** test  */
        this.databaseService.saveUserProfile(user).then(obj => {
            //console.log("save user profile :" + obj);
        }).catch(error => {
            this.errorHandler(error);
        })

        this.appService.user = user;

        this.router.navigate(['chat']);
    }

    logout() {
        this.userId = undefined;
        this.loginService.logout();
    }

    errorHandler(error) {
        this.error = error;
        console.log(error);
        this.titleMessage = "ERROR";
    }

    register() {
        this.isRegister = true;
        this.titleMessage = "Register Form";
    }

    cancel() {
        this.isRegister = false;
        this.titleMessage = "Please Sign In";
    }

    registerUser() {
        this.loginService.registerUser(this.email, this.password).then(result => {
            this.isRegister = false;
            this.titleMessage = "Register Success.";
        }).catch(error => {
            this.errorHandler(error);
        });
    }

    ngOnDestroy() {
        if (this.userProfileSubscribe) {
            this.userProfileSubscribe.unsubscribe();
        }
    }
}