import { Component, OnInit} from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../documents.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  subscription: Subscription;
  documents: Document[] = [];

  constructor(private documentService: DocumentService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() { 
      this.documents = this.documentService.getDocuments();

      this.subscription = this.documentService.documentChangedEvent
      .subscribe(
        (documentList: Document[]) => {
          this.documents = documentList;
        }
      );
   }


   onNewDocument() {
    this.router.navigate(['new'], {relativeTo: this.route});
   }
}
