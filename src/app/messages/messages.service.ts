import {Injectable} from '@angular/core';
import { Message } from "../messages/message.model";
import { MOCKMESSAGES } from "./MOCKMESSAGES";
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MessagesService {

messageChangeEvent = new Subject<Message[]>();

     messages: Message[] = [];
     constructor() {
         this.messages = MOCKMESSAGES;
     }

     getMessages() {
         return this.messages.slice();
     }

     addMessage(message: Message){
         this.messages.push(message);
         this.messageChangeEvent.next(this.messages.slice());
         }
}