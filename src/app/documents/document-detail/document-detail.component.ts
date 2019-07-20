import { Component, OnInit} from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../documents.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { WinRefService } from 'src/app/win-ref.service';

@Component({
  selector: 'cms-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit {
  document: Document;
  nativeWindow: any;
  id: string;
  
  constructor(private documentService: DocumentService,
              private windowRefService: WinRefService,
              private route: ActivatedRoute,
              private router: Router) {
      this.nativeWindow = windowRefService.getNativeWindow();
               }

  ngOnInit() {
    this.route.params 
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.document = this.documentService.getDocument(this.id);
        }
      );
  }

  onEditDocument(){
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onView() {
    if (this.document.url)  {
      this.nativeWindow.open(this.document.url);
    }
  }

  onDelete() {
    this.documentService.deleteDocument(this.document)
    this.router.navigate(['/documents']);
  }

}
