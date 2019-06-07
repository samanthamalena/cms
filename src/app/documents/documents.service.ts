import {Injectable, EventEmitter} from '@angular/core';
import { Document } from "../documents/document.model";
import { MOCKDOCUMENTS } from "./MOCKDOCUMENTS"

@Injectable({
    providedIn: 'root'
})
export class DocumentService {

selectedDocument = new EventEmitter<Document>();
documentChangedEvent = new EventEmitter<Document[]>();

     private documents: Document[] = [];
     constructor() {
         this.documents = MOCKDOCUMENTS;
     }

     getDocuments() {
         return this.documents.slice();
     }

     getDocument(id: string): Document {
         for (let i = 0; i < this.documents.length; i++) {
             if (this.documents[i].id === id) {
                 return this.documents[i];
             }
         }
         return null;
     }

    deleteDocument( document: Document) {
        if (!document) {
            return;
        }

        const pos = this.documents.findIndex(d => d.id === document.id);

        if (pos < 0){
            return;
        }
        
        this.documents.splice(pos, 1);
        this.documentChangedEvent.emit(this.documents.slice());
        
    }
}