import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../documents.service';

@Component({
  selector: 'cms-document-item',
  templateUrl: './document-item.component.html',
  styleUrls: ['./document-item.component.css']
})
export class DocumentItemComponent implements OnInit {
@Input() document: Document;

constructor(private documentSerivce: DocumentService) { }

  ngOnInit() {
  }

  onSelected(){
    this.documentSerivce.selectedDocument.emit(this.document);
  }
}
