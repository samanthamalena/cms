import {Injectable, EventEmitter} from '@angular/core';
import { Contact } from "../contacts/contact-list/contact.model";
import { MOCKCONTACTS } from "./MOCKCONTACTS"

@Injectable()
export class ContactService {

selectedContactEvent = new EventEmitter<Contact>();
     private contacts: Contact[] = [];
     constructor() {
         this.contacts = MOCKCONTACTS;
     }

     getContacts() {
         return this.contacts.slice();
     }

     getContact(id: string): Contact {
         for (let i = 0; i < Contact.length; i++) {
             if (this.contacts[i].id === id) {
                 return this.contacts[i];
             }
         }
         return null;
     }
}