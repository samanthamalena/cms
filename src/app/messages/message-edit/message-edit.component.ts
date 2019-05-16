import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef} from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
@ViewChild('subject') subject: ElementRef;
@ViewChild('msgText') msgText: ElementRef;


currentSender: string = 'Samantha';

@Output() addedMessage = new EventEmitter<Message>();
  constructor() { }

  ngOnInit() {
  }

  onSendMessage(){
  const subjectValue = this.subject.nativeElement.value;
  const msgTextValue = this.msgText.nativeElement.value;
  const newMessage : Message = new Message ('', subjectValue, msgTextValue, this.currentSender);
  this.addedMessage.emit(newMessage);
  this.onClearMessage();
}

  onClearMessage(){
    this.subject.nativeElement.value = '';
    this.msgText.nativeElement.value = '';
  }
}
