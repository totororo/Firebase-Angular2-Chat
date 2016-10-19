import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat.component';
import { DatabaseService } from '../database/database.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [DatabaseService],
  declarations: [ChatComponent]
})
export class ChatModule { }
