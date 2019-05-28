import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { Message } from '../message.model';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
@ViewChild('subject') subject: ElementRef;
@ViewChild('msgText') msgText: ElementRef;

currentSender = '100';
//currentSender: string = 'Samantha';

constructor(private messagesService: MessagesService) { }

ngOnInit() { }

onSendMessage(){
  const subjectValue = this.subject.nativeElement.value;
  const msgTextValue = this.msgText.nativeElement.value;
  const newMessage = new Message ('', subjectValue, msgTextValue, this.currentSender);
  this.messagesService.addMessage(newMessage);
}

  onClearMessage(){
    this.subject.nativeElement.value = '';
    this.msgText.nativeElement.value = '';
  }
}
