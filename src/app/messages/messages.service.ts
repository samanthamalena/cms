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
    newMessage: string;

    private messages: Message[] = [];

     constructor(private http: HttpClient) {
       //  this.messages = MOCKMESSAGES;
         this.maxMessageId = this.getMaxId();
     }

     getMaxId(): number {
        this.messages.forEach(message => {
            this.currentId = +message.id;

            if (this.currentId > this.maxId)
                this.maxId = this.currentId;
        });
        return this.maxId;
    }

    //  storeMessages() {
    //    //    let json = JSON.stringify(messages);
    //   //     let header = new HttpHeaders({'Content-Type': 'application/json'});
    //        this.http.put('https://samanthahancock-cms.firebaseio.com/messages.json', this.messages)
    //            .subscribe((response: Response)=> {
    //                console.log(response);
    //            });
    //    }

     getMessages() {
        this.http.get<{ message: string, messages: Message[]}>('http://localhost:3000/messages')
        .subscribe(
            (responseData) => {
                this.messages = responseData.messages;
                this.messages.sort((a, b) => a.subject > b.subject ? 1 : b.subject > a.subject ? -1 : 0);
                this.messageChangeEvent.next(this.messages.slice());
            },
            (error: any) => {
                console.log(error);
            }
        );
     }

     addMessage(message: Message){
        if (!message) {
            return;
        }

        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        message.id = '';

        this.http.post('http://localhost:3000/messages', message, {headers: headers})
            .subscribe(
                (message: Message) => {
                    this.messages.push(message);
                    this.messageChangeEvent.next(this.messages.slice());
                })
}
}