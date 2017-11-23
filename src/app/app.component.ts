import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Ontodia-angular';
  irisToShow = [ 'http://ailab.ifmo.ru/dialog/tv/schema#Battery' ];
}
