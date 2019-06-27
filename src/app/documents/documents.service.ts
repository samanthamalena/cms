import { Injectable } from '@angular/core';
import { Document } from "../documents/document.model";
import { MOCKDOCUMENTS } from "./MOCKDOCUMENTS"
import { Subject, Observable } from 'rxjs';
import { DocumentEditComponent } from './document-edit/document-edit.component';
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";

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
    maxId: number;
    currentId: number;
    documentsListClone: Document[] = [];

    private documents: Document[] = [];

    constructor(private http: HttpClient) {
      //  this.documents = MOCKDOCUMENTS;
        this.maxDocumentId = this.getMaxId();
    }

    storeDocuments() {
     //   let json = JSON.stringify(documents);
     //   let header = new HttpHeaders({'Content-Type': 'application/json'});
        this.http.put('https://samanthahancock-cms.firebaseio.com/documents.json', this.documents)
            .subscribe((response: Response)=> {
                console.log(response);
            });
    }

    getDocuments() {
        this.http.get<Document[]>('https://samanthahancock-cms.firebaseio.com/documents.json')
            .subscribe(
                (documents) => {
                    this.documents = documents;
                    this.documents.sort((a, b) => a.name > b.name ? 1 : b.name > a.name ? -1 : 0);
                    this.documentChangedEvent.next(this.documents.slice());
                },
                (error: any) => {
                    console.log(error);
                }
            );
    }

    getDocument(id: string): Document {
        for (let i = 0; i < this.documents.length; i++) {
            if (this.documents[i].id === id) {
                return this.documents[i];
            }
        }
        return null;
    }

    deleteDocument(document: Document) {
        if (!document) {
            return;
        }

        const pos = this.documents.findIndex(d => d.id === document.id);

        if (pos < 0) {
            return;
        }

        this.documents.splice(pos, 1);
        this.documentsListClone = this.documents.slice();
        this.documentChangedEvent.next(this.documentsListClone);
        this.storeDocuments();
    }

    getMaxId(): number {
        this.documents.forEach(document => {
            this.currentId = +document.id;

            if (this.currentId > this.maxId)
                this.maxId = this.currentId;
        });
        return this.maxId;
    }


    addDocument(newDocument: Document) {
        if (newDocument === null) {
            return;
        }
        this.maxDocumentId++;
        newDocument.id = window.location.hash = this.maxDocumentId.toString();
        this.documents.push(newDocument);
        this.documentsListClone = this.documents.slice();
        this.documentChangedEvent.next(this.documentsListClone);
        this.storeDocuments();
    
    }

    updateDocument(originalDocument: Document,
        newDocument: Document) {
        if (!originalDocument || !newDocument) {
            return;
        }
        const pos = this.documents.findIndex(d => d.id === originalDocument.id)
        if (pos < 0) {
            return;
        }

        newDocument.id = originalDocument.id;
        this.documents[pos] = newDocument;
        this.documentsListClone = this.documents.slice();
        this.documentChangedEvent.next(this.documentsListClone);
        this.storeDocuments();
    }

}