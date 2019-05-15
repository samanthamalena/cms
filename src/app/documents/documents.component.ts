import { Component, OnInit, Input } from '@angular/core';
import { Document } from '../documents/document.model';

@Component({
  selector: 'cms-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
  selectedDocumentEvent: Document;

  @Input() Document: Document;
  
  constructor() { }

  ngOnInit() {
  }

}
