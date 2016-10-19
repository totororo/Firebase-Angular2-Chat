import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { PushNotificationsService } from 'angular2-notifications';

import { Chat } from '../object/chat.object';
import { DatabaseService } from '../database/database.service';
import { AppService } from '../app.service';
import { User } from '../object/user.object';

@Component({
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent implements OnInit, AfterViewChecked {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  chatItems: Array<Chat>;
  userChatItems: Array<Chat> = [];
  chatMessage: string = undefined;
  userProfiles = [];

  constructor(private databaseService: DatabaseService,
    private appService: AppService,
    private router: Router,
    private pushNotificationService: PushNotificationsService) {
    if (this.appService.user == undefined) {
      this.router.navigate(["/"]);
    }

    this.pushNotificationService.requestPermission();
  }

  ngOnInit() {
    // user memo.
    this.databaseService.userChats().subscribe(obj => {
      this.userChatItems = obj;
    });

    this.databaseService.userProfiles().subscribe(user => {
      if (user == undefined || user.length == 0) return;
      this.userProfiles[user[0].uid] = user[0];
    });

    // all memo.
    this.allChat();
    //this.userMemo();
    this.scrollToBottom();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  private allChat() {
    this.databaseService.getAllChat().subscribe(chats => {
      this.chatItems = chats;
      this.chatItems.forEach(memo => {
        if (this.userProfiles[memo.uid] == undefined)
          this.databaseService.findUserById(memo.uid);
      });
      if (chats.length > 0) {
        // Push Notification.
        let lastChat = this.chatItems[chats.length - 1];
        let newMessage = lastChat.message;

        if (this.appService.user.uid != lastChat.uid) {
          this.pushNotificationService.create("New Message", { body: newMessage }).subscribe(
            res => console.log(res),
            err => console.log(err)
          );
        }
      }
    });
  }

  addChat() {
    if (this.chatMessage == undefined || this.chatMessage.length == 0) return;
    let chat: Chat = new Chat();
    chat.message = this.chatMessage;
    chat.chat_datetime = Date.now();

    chat.uid = this.appService.user.uid;
    this.databaseService.addChat(chat).catch(error => {
      this.errorHandler(error);
      return;
    });

    this.chatMessage = undefined;
  }

  userChat() {
    if (this.appService.user != undefined) {
      this.databaseService.getUserChats(this.appService.user.uid);
    }
  }

  errorHandler(error) {
    console.log(error);
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }
}
