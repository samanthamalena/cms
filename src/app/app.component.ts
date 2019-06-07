import { Component } from '@angular/core';

@Component({
  selector: 'cms-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title= 'WebLearn CMS!';

  onNavigate(feature: string){
    this.title= feature;
  }

}
