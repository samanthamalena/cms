import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../messages/message.model';

@Component({
  selector: 'cms-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
 selectedMessageEvent: Message;

 @Input() Message: Message;
  constructor() { }

  ngOnInit() {
  }

}
