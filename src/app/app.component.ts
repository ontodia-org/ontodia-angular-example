import { Component } from '@angular/core';
import { AppModel } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title = 'Ontodia-angular';
  public model: AppModel;

  constructor () {
    this.model = {
      selectedIRI: null,
      IRIs: [ 'http://ailab.ifmo.ru/dialog/tv/schema#Battery' ],
    };
  }

  handleNewIRI (newIRI: string) {
    const newList = [].concat(this.model.IRIs);
    newList.push(newIRI);
    this.model = {
      selectedIRI: null,
      IRIs: newList,
    };
  }
}
