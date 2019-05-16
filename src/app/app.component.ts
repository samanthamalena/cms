import { Component } from '@angular/core';

@Component({
  selector: 'cms-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loadedFeature = 'contact';
  selectedFeature = 'document';

  onNavigate(feature: string){
    this.loadedFeature= feature;
  }

  switchView(selectedFeature: string){
    this.selectedFeature = selectedFeature;
  }
}
