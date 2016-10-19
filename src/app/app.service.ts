import { Injectable } from '@angular/core';

import { User } from './object/user.object';

@Injectable()

export class AppService {
    version: number = 0.1;
    user: User;
    constructor() {
        console.log(" === APP SERVICE === Version:" + this.version);
    }
}