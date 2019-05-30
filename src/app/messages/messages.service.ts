import {Injectable, EventEmitter} from '@angular/core';
import { Message } from "../messages/message.model";
import { MOCKMESSAGES } from "./MOCKMESSAGES";

@Injectable({
    providedIn: 'root'
})
export class MessagesService {

messageChangeEvent = new EventEmitter<Message[]>();

     messages: Message[] = [];
     constructor() {
         this.messages = MOCKMESSAGES;
     }

     getMessages() {
         return this.messages.slice();
     }

     addMessage(message: Message){
         this.messages.push(message);
         this.messageChangeEvent.emit(this.messages.slice());
         }
}