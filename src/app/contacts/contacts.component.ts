import { Component, OnInit, Input } from '@angular/core';
import { Contact } from '../contacts/contact-list/contact.model';

@Component({
  selector: 'cms-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  selectedContactEvent: Contact;
  
  @Input() Contact: Contact;
  
  constructor() { }

  ngOnInit() {
  }

}
