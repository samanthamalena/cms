import { Injectable } from '@angular/core';
import { Document } from "../documents/document.model";
import { MOCKDOCUMENTS } from "./MOCKDOCUMENTS"
import { Subject } from 'rxjs';
import { DocumentEditComponent } from './document-edit/document-edit.component';

@Injectable({
    providedIn: 'root'
})
export class DocumentService {
id: string;
selectedDocument = new Subject<Document>();
documentChangedEvent = new Subject<Document[]>();
maxDocumentId: number;
originalDocument: DocumentEditComponent;
newDocument: string;
maxId:number;
currentId: number;
documentsListClone: Document[] = [];

     private documents: Document[] = [];
    
     constructor() {
         this.documents = MOCKDOCUMENTS;
         this.maxDocumentId = this.getMaxId();
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
        this.documentChangedEvent.next(this.documents.slice());
        
    }
    getMaxId(): number {
        this.documents.forEach(document =>{
            this.currentId = +document.id;

            if(this.currentId > this.maxId)
            this.maxId = this.currentId;
        });
        return this.maxId;
        }
    
    
    addDocument(newDocument: Document){
        if(newDocument == null){
            return;
        }
        this.maxDocumentId++;
        newDocument.id = window.location.hash = this.maxDocumentId.toString();
        this.documents.push(newDocument);
        this.documentChangedEvent.next(this.documents.slice());
        }

    updateDocument(originalDocument: Document,
                   newDocument: Document){
                       if(!originalDocument || !newDocument){
                           return;
                       }
                      const pos = this.documents.findIndex(d => d.id === originalDocument.id)
                       if(pos < 0){
                          return;
                      }

                       newDocument.id = originalDocument.id;
                       this.documents[pos] = newDocument;
                      this.documentsListClone = this.documents.slice();
                       this.documentChangedEvent.next(this.documentsListClone); 
                   }

}