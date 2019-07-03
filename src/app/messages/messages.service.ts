import {Injectable} from '@angular/core';
import { Message } from "../messages/message.model";
import { MOCKMESSAGES } from "./MOCKMESSAGES";
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";


@Injectable({
    providedIn: 'root'
})
export class MessagesService {
    maxMessageId: number;
    maxId: number;
    currentId: number;
    messageChangeEvent = new Subject<Message[]>();
    messages: Message[] = [];
    newMessage: string;

     constructor(private http: HttpClient) {
       //  this.messages = MOCKMESSAGES;
         this.maxMessageId = this.getMaxId();
     }

     storeMessages() {
       //    let json = JSON.stringify(messages);
      //     let header = new HttpHeaders({'Content-Type': 'application/json'});
           this.http.put('https://samanthahancock-cms.firebaseio.com/messages.json', this.messages)
               .subscribe((response: Response)=> {
                   console.log(response);
               });
       }

     getMessages() {
        this.http.get<Message[]>('https://samanthahancock-cms.firebaseio.com/messages.json')
        .subscribe(
            (messages) => {
                this.messages = messages;
                this.messages.sort((a, b) => a.subject > b.subject ? 1 : b.subject > a.subject ? -1 : 0);
                this.messageChangeEvent.next(this.messages.slice());
            },
            (error: any) => {
                console.log(error);
            }
        );
     }

     addMessage(message: Message){
         this.messages.push(message);
         let messagesListClone = this.messages.slice();
         this.messageChangeEvent.next(this.messages.slice());
         this.storeMessages();
         }

         getMaxId(): number {
            this.messages.forEach(message => {
                this.currentId = +message.id;
    
                if (this.currentId > this.maxId)
                    this.maxId = this.currentId;
            });
            return this.maxId;
        }
}