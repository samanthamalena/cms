import { Component, Input, OnInit} from '@angular/core';
import { Contact } from '../contact-list/contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-item',
  templateUrl: './contact-item.component.html',
  styleUrls: ['./contact-item.component.css']
})
export class ContactItemComponent implements OnInit {
@Input() contact: Contact;
  
constructor(private contactService: ContactService) { }

  ngOnInit() {
  }

  onSelected() {
   this.contactService.selectedContactEvent.emit(this.contact);
 }

}
