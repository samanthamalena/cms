import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { DndModule } from 'ng2-dnd';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ContactListComponent } from './contacts/contact-list/contact-list.component';
import { ContactDetailComponent } from './contacts/contact-detail/contact-detail.component';
import { ContactItemComponent } from './contacts/contact-item/contact-item.component';
import { DocumentsComponent } from './documents/documents.component';
import { DocumentItemComponent } from './documents/document-item/document-item.component';
import { DocumentDetailComponent } from './documents/document-detail/document-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { MessageItemComponent } from './messages/message-item/message-item.component';
import { MessageEditComponent } from './messages/message-edit/message-edit.component';
import { MessageListComponent } from './messages/message-list/message-list.component';
import { DocumentListComponent } from './documents/document-list/document-list.component';
import { DropdownDirective } from './dropdown.directive';
import { AppRoutingModule } from './app-routing.module';
import { DocumentEditComponent } from './documents/document-edit/document-edit.component';
import { ContactEditComponent } from './contacts/contact-edit/contact-edit.component';
import { WinRefService } from './win-ref.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessagesService } from './messages/messages.service';
import { DocumentService } from './documents/documents.service';
import { ContactService } from './contacts/contact.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContactsComponent,
    ContactListComponent,
    ContactDetailComponent,
    ContactItemComponent,
    DocumentsComponent,
    DocumentItemComponent,
    DocumentDetailComponent,
    MessagesComponent,
    MessageItemComponent,
    MessageEditComponent,
    MessageListComponent,
    DocumentListComponent,
    DropdownDirective,
    DocumentEditComponent,
    ContactEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    DndModule.forRoot(),
    HttpClientModule

  ],
  providers: [WinRefService],
  bootstrap: [AppComponent]
})
export class AppModule { }
