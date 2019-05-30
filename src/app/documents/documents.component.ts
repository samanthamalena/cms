import { Component, OnInit, Input } from '@angular/core';
import { Document } from '../documents/document.model';
import { DocumentService } from './documents.service';

@Component({
  selector: 'cms-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css'],
  providers: []
})
export class DocumentsComponent implements OnInit {
  selectedDocument: Document;

  @Input() Document: Document;
  
  constructor(private documentService: DocumentService) { }

  ngOnInit() {
    this.documentService.selectedDocument
    .subscribe(
      (document: Document) => {
        this.selectedDocument = document
      }
    );
  }

}
