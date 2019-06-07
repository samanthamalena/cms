import { Component, OnInit, Input } from '@angular/core';
import { Contact } from './contact.model';
import { ContactService } from './contact.service';

@Component({
  selector: 'cms-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
  providers: []
})
export class ContactsComponent implements OnInit {
  selectedContactEvent: Contact;
  
  @Input() Contact: Contact;
  
  constructor(private contactService: ContactService) { }

  ngOnInit() {
    this.contactService.selectedContactEvent
    .subscribe(
      (contact: Contact) => {
        this.selectedContactEvent = contact
      }
    );
  }

}
