import { Component, OnInit, Output, Input, EventEmitter} from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
@Input() Message: Message;
@Output() selectedMessageEvent = new EventEmitter<Message>();
  constructor() { }

  ngOnInit() {
  }

  onSendMessage(message: Message){
    this.selectedMessageEvent.emit(message);
  }

  onClearMessage(message: Message){
    this.selectedMessageEvent.emit(message);
  }
}
