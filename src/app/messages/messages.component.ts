import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../messages/message.model';
import { MessagesService } from './messages.service';

@Component({
  selector: 'cms-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
  providers: []
})
export class MessagesComponent implements OnInit {

  constructor(private messagesService: MessagesService) { }

  ngOnInit() {

  }

}
