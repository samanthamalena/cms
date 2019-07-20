import { Injectable } from '@angular/core';
import { Document } from "../documents/document.model";
import { MOCKDOCUMENTS } from "./MOCKDOCUMENTS";
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
        this.maxDocumentId = this.getMaxId();
    }

 //  storeDocuments(documents: Document[]) {
  //      let json = JSON.stringify(documents);
  //      let header = new HttpHeaders({'Content-Type': 'application/json'});
  //      this.http.put('http://localhost:3000/documents', json, {headers: header})
  //          .subscribe((response: Response)=> {
  //              this.documentChangedEvent.next(documents.slice());
  //          });
  //  } 

    getDocuments() {
        this.http.get<{ message: string, documents: Document[] }>('http://localhost:3000/documents')
            .subscribe(
                (responseData) => {
                    this.documents = responseData.documents;
                    this.documents.sort((a, b) => a.name > b.name ? 1 : b.name > a.name ? -1 : 0);
                    this.documentChangedEvent.next(this.documents.slice());
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

        this.http.delete<{ message: string}>('http://localhost:3000/documents/' + document.id)
            .subscribe(
                (message) => {
                    this.documents.splice(pos, 1);
                    this.documentChangedEvent.next(this.documents.slice());
                });
    }

    getMaxId(): number {
        this.documents.forEach(document => {
            this.currentId = +document.id;

            if (this.currentId > this.maxId)
                this.maxId = this.currentId;
        });
        return this.maxId;
    }


    addDocument(document: Document) {
        if (!document) {
            return;
        }

        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        document.id = '';
        //const strDocument = JSON.stringify(document);

        this.http.post('http://localhost:3000/documents', document, {headers: headers})
            .subscribe(
                (document: Document) => {
                    this.documents.push(document);
                    this.documentChangedEvent.next(this.documents.slice());
                });
     }
    updateDocument(originalDocument: Document,
        newDocument: Document) {
        if (!originalDocument || !newDocument) {
            return;
        }
        const pos = this.documents.findIndex(c => c.id === originalDocument.id);
        if (pos < 0) {
            return;
        }

        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        newDocument.id = originalDocument.id;

      //  const strDocument = JSON.stringify(newDocument);

        this.http.put('http://localhost:3000/documents/' + originalDocument.id
                        , newDocument
                        , {headers: headers})
            .subscribe(
                (response: Response) => {
                    this.documents[pos] = newDocument;
                    this.documentChangedEvent.next(this.documents.slice());
                });
        
    }

}