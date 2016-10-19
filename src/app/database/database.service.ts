import { Injectable } from '@angular/core';
import { AngularFire, FirebaseAuthState, FirebaseListObservable } from 'angularfire2';
import { Subject } from 'rxjs/Subject';
import { User } from '../object/user.object';
import { Chat } from '../object/chat.object';

@Injectable()
export class DatabaseService {

    chatItems: FirebaseListObservable<any>;
    uidSubject = new Subject();
    chatUidSubject = new Subject();

    constructor(private angularFire: AngularFire) {
        this.chatItems = this.angularFire.database.list("/chat/content/", {
            query: {
                orderByChild: 'chat_datetime'
            }
        });
    }

    addChat(chat: Chat) {
        return this.chatItems.push(chat);
    }

    userChats() {
        return this.angularFire.database.list("/chat/content/", {
            query: {
                orderByChild: 'uid',
                equalTo: this.chatUidSubject
            }
        });
    }

    getUserChats(uid) {
        this.chatUidSubject.next(uid);
    }

    getAllChat() {
        return this.chatItems;
    }

    saveChat(userId, content: string) {
        let timestamp = new Date().getTime();
        let itemObservable = this.angularFire.database.object('/chat/content/');
        return itemObservable.set({ uid: userId, timestamp: timestamp, text: content });
    }

    deleteChat(key) {
        this.chatItems.remove(key);
    }

    saveUserProfile(user: FirebaseAuthState) {
        let itemObservable = this.angularFire.database.object('/chat/user_profile/' + user.uid);
        return itemObservable.set({ uid: user.uid, display_name: user.auth.displayName == null ? "ANONY" : user.auth.displayName, photo_url: user.auth.photoURL });
    }

    userProfiles() {
        return this.angularFire.database.list("/chat/user_profile/", {
            query: {
                orderByChild: 'uid',
                equalTo: this.uidSubject
            }
        });
    }

    findUserById(uid) {
        this.uidSubject.next(uid);
    }

}


