import { Injectable } from '@angular/core';
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
    selectedContactEvent = new Subject<Contact>();
    contactChangedEvent = new Subject<Contact[]>();
    maxContactId: number;
    originialContact: ContactEditComponent;
    newContact: string;
    maxId: number;
    currentId: number;
    contactsListClone: Contact[] = []
    
    
    private contacts: Contact[] = [];

    constructor(private http: HttpClient) {
     //   this.contacts = MOCKCONTACTS;
        this.maxContactId = this.getMaxId();
    }

    // storeContacts() {
    //     //   let json = JSON.stringify(contacts);
    //     //   let header = new HttpHeaders({'Content-Type': 'application/json'});
    //        this.http.put('https://samanthahancock-cms.firebaseio.com/contacts.json', this.contacts)
    //            .subscribe((response: Response)=> {
    //                console.log(response);
    //            });
    //    }

    getContacts() {
        this.http.get<{ message: string, contacts: Contact[]}>('http://localhost:3000/contacts')
        .subscribe(
            (responseData) => {
                this.contacts = responseData.contacts;
                this.contacts.sort((a, b) => a.name > b.name ? 1 : b.name > a.name ? -1 : 0);
                this.contactChangedEvent.next(this.contacts.slice());
            }
        );
    }

    getContact(id: string): Contact {
        for (let i = 0; i < this.contacts.length; i++) {
            if (this.contacts[i].id === id) {
                return this.contacts[i];
            }
        }
        return null;
    }


    deleteContact(contact: Contact) {
        if (!contact) {
            return;
        }

        const pos = this.contacts.findIndex(c => c.id === contact.id);
        if (pos < 0) {
            return;
        }

        this.http.delete<{ message: string}>('http://localhost:3000/contacts/' + contact.id)
        .subscribe(
            (message) => {
                this.contacts.splice(pos, 1);
                this.contactChangedEvent.next(this.contacts.slice());
            });
    } 

    getMaxId(): number {
        this.contacts.forEach(contact => {
            this.currentId = +contact.id;

            if (this.currentId > this.maxId)
                this.maxId = this.currentId;
        });
        return this.maxId;
    }

    addContact(contact: Contact) {
        if (!contact) {
            return;
        }
        
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        contact.id = '';

        this.http.post('http://localhost:3000/contacts', contact, {headers: headers})
                .subscribe(
                    (contact: Contact) => {
                        this.contacts.push(contact);
                        this.contactChangedEvent.next(this.contacts.slice());
                    });
                }

            updateContact(originialContact: Contact,
                newContact: Contact) {
                if (!originialContact || !newContact) {
                    return;
                }
                const pos = this.contacts.findIndex(d => d.id === originialContact.id)
                if (pos < 0) {
                    return;
                }
             
                const headers = new HttpHeaders({
                    'Content-Type': 'application/json'
                });
        
                newContact.id = originialContact.id;
        
                this.http.put('http://localhost:3000/contacts' + originialContact.id
                            , newContact
                            , {headers: headers})
                        .subscribe(
                            (response: Response) => {
                                this.contacts[pos] = newContact;
                                this.contactChangedEvent.next(this.contacts.slice());
                            });
            }
        }        
