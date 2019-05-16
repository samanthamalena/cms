import { Component, OnInit, } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  message: Message[] = [
      new Message('1', 'Missing Homework', 'Hey, it looks like your homework is missing.', 'Bro. Jackson'),
      new Message('2', 'Subject', 'This is a message', 'Bro.Barzee')
  ];

}
