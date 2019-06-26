import {Injectable} from '@angular/core';
import { Contact } from "./contact.model";
import { MOCKCONTACTS } from "./MOCKCONTACTS";
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subject } from 'rxjs';
import { ContactEditComponent } from './contact-edit/contact-edit.component';

@Injectable({
    providedIn: 'root'
})
export class ContactService {
id: string;
maxContactId: number;
originialContact: ContactEditComponent;
newContact: string;
maxId: number;
currentId: number;
contactsListClone: Contact[] = []
contactChangedEvent = new Subject<Contact[]>();
selectedContactEvent = new Subject<Contact>();

private contacts: Contact[] = [];
     constructor() {
         this.contacts = MOCKCONTACTS;
         this.maxContactId = this.getMaxId();
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

    getMaxId(): number {
        this.contacts.forEach(contact =>{
            this.currentId = +contact.id;

            if(this.currentId > this.maxId)
            this.maxId = this.currentId;
        });
        return this.maxId;
        }


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
    
    updateContact(originialContact: Contact,
        newContact: Contact){
            if(!originialContact || !newContact){
                return;
            }
           const pos = this.contacts.findIndex(d => d.id === originialContact.id)
            if(pos < 0){
               return;
           }

            newContact.id = originialContact.id;
            this.contacts[pos] = newContact;
           this.contactsListClone = this.contacts.slice();
            this.contactChangedEvent.next(this.contactsListClone); 
        }

    addContact(newContact: Contact){
        if(newContact == null){
            return;
        }
        this.maxContactId++;
        newContact.id = window.location.hash = this.maxContactId.toString();
        this.contacts.push(newContact);
        this.contactChangedEvent.next(this.contacts.slice());
        }
}