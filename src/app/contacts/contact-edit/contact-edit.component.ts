import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { NgForm } from '@angular/forms';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';

@Component({
  selector: 'cms-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {
  id: string;
  editMode: boolean = false;
  hasGroup: boolean = false;
  originalContact: Contact;
  contact: Contact;
  groupContacts: Contact[] = [];
  invalidGroupContact: false;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private contactService: ContactService) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];

          if (!this.id) {
            this.editMode = false;
            return;
          }


          this.originalContact = this.contactService.getContact(this.id);

          if (!this.originalContact) {
            return;
          }
          this.editMode = true;
          this.contact = JSON.parse(JSON.stringify(this.originalContact));

          if( 
            this.originalContact.group &&
            this.originalContact.group.length > 0
          ) {
            this.groupContacts = JSON.parse(
              JSON.stringify(this.originalContact.group)
            );
          }
        });
  }

  onSubmit(form: NgForm) {
    let values = form.value;
    let newContact = new Contact(' ', values.name, values.email, values.phone, values.imageUrl, this.groupContacts);
    
    if (this.editMode) {
      this.contactService.updateContact(this.originalContact, newContact);
    }
    else {
      this.contactService.addContact(newContact);
    }
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onRemoveItem(index: number) {
    if (index < 0 || index >= this.groupContacts.length) {
      return;
    }
    this.groupContacts.splice(index, 1);
    this.invalidGroupContact = false;
  }

  addToGroup($event: any) {
    const selectedContact: Contact = $event.dragData;
    const invalidGroupContact = this.isInvalidContact(selectedContact);

    if (invalidGroupContact) {
      return;
    }

    this.groupContacts.push(selectedContact);
    this.invalidGroupContact = false;
  }

  isInvalidContact(newContact: Contact) {
    if (!newContact) {
      return true;
    }

    if (newContact.id === this.contact.id) {
      return true;
    }

    for (let i = 0; i < this.groupContacts.length; i++) {
      if (newContact.id === this.groupContacts[i].id) {
        return true;
      }
    }
    return false;
  }


}
