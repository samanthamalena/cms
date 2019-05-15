import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { Document } from '../document.model';
@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
@Output() selectedDocumentEvent = new EventEmitter<Document>();

  constructor() { }

  ngOnInit() {  }

  documents: Document[] = [
    new Document('1', 'Samantha', 'This is a document', 'https://web.byui.edu/Directory/Employee/jacksonk.jpg',null),
    new Document('2', 'Connor', 'This is a test', 'https://web.byui.edu/Directory/Employee/jacksonk.jpg', null)
  ];

  onSelected(document: Document){
    this.selectedDocumentEvent.emit(document);
  }

}
