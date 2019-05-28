import {Injectable, EventEmitter} from '@angular/core';
import { Document } from "../documents/document.model";
import { MOCKDOCUMENTS } from "./MOCKDOCUMENTS"

@Injectable()
export class DocumentService {

selectedDocument = new EventEmitter<Document>();
     private documents: Document[] = [];
     constructor() {
         this.documents = MOCKDOCUMENTS;
     }

     getDocuments() {
         return this.documents.slice();
     }

     getDocument(id: string): Document {
         for (let i = 0; i < Document.length; i++) {
             if (this.documents[i].documentId === id) {
                 return this.documents[i];
             }
         }
         return null;
     }
}