import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DocumentService } from '../documents.service';
import { NgForm } from '@angular/forms';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {
  id: string;
  editMode: boolean = false;
  originalDocument: Document;
  document: Document;



  constructor(private documentService: DocumentService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];

          if (!this.id) {
            this.editMode = false;
            return;
          }

          this.originalDocument = this.documentService.getDocument(this.id);

          if (!this.originalDocument) {
            return;
          }

          this.editMode = true;
          this.document = JSON.parse(JSON.stringify(this.originalDocument));

        }
      );
  }

  onSubmit(form: NgForm) {
    let values = form.value;
    let newDocument = new Document(' ', values.name, values.description, values.url, null);

    if (!this.editMode) {
      this.documentService.updateDocument(this.originalDocument, newDocument);
    }
    else {
      this.documentService.addDocument(newDocument);
    }
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onCancel(){
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}



