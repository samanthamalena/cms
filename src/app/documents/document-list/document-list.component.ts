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
    new Document('1', 'Document 1', 'This is a really important document so words are very important to type and put in the website.', 'https://www.lightspeedlegal.com/wp-content/themes/lightspeed/img/Virtual-Document-Review.png' ,null),
    new Document('2', 'Document 2', 'Again, this document is super important and I want to make sure that everyone knows that.', 'https://www.lightspeedlegal.com/wp-content/themes/lightspeed/img/Virtual-Document-Review.png', null),
    new Document('3', 'Document 3', 'So, here is another document. Im not sure what to put in here', 'https://www.lightspeedlegal.com/wp-content/themes/lightspeed/img/Virtual-Document-Review.png', null),
    new Document('4', 'Document 4', 'This is another test and I am just going to keep typing.', 'https://www.lightspeedlegal.com/wp-content/themes/lightspeed/img/Virtual-Document-Review.png', null),
    new Document('5', 'Document 5', 'Maybe this will be another document, im not sure.', 'https://www.lightspeedlegal.com/wp-content/themes/lightspeed/img/Virtual-Document-Review.png', null),
    new Document('6', 'Document 6', 'Okay this is the last test document, I am going to finish typing.', 'https://www.lightspeedlegal.com/wp-content/themes/lightspeed/img/Virtual-Document-Review.png', null)
  ];

  onSelected(document: Document){
    this.selectedDocumentEvent.emit(document);
  }

}
