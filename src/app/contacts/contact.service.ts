import {Injectable} from '@angular/core';
import { Contact } from "./contact.model";
import { MOCKCONTACTS } from "./MOCKCONTACTS"
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ContactService {

contactChangedEvent = new Subject<Contact[]>();
deleteContact(contact: Contact) {
    if (!contact) {
        return;
    }

    const pos = this.contacts.findIndex(d => d.id === contact.id);

    if (pos < 0){
        return;
    }
    
    this.contacts.splice(pos, 1);
    this.contactChangedEvent.next(this.contacts.slice());
}

selectedContactEvent = new Subject<Contact>();
     private contacts: Contact[] = [];
     constructor() {
         this.contacts = MOCKCONTACTS;
     }

     getContacts() : Contact[] {
         return this.contacts.slice();
     }

   getContact(id: string): Contact {
        for (let i = 0; i < this.contacts.length; i++) {
            if (this.contacts[i].id === id) {
                return this.contacts[i];
            }
        }
        return null;
    }

}