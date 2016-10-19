import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ChatComponent } from './chat.component';
import { DatabaseService } from '../database/database.service';
import { CoreModule } from '../core/core.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  providers: [DatabaseService],
  declarations: [ChatComponent]
})

export class ChatModule { }
