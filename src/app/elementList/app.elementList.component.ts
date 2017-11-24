import { Component, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { AppModel } from '../models';

@Component({
  selector: 'app-element-list-component',
  templateUrl: './app.elementList.component.html',
  styleUrls: ['./app.elementList.component.css']
})
export class AppElementListComponent {
  @Input() model: AppModel;
  newElementId = '';

  @Output() newIRI = new EventEmitter();

  public onSelect (iri: string) {
    this.newIRI.emit(iri);
  }

  public onPressAdd () {
    if (this.model.IRIs.indexOf(this.newElementId) === -1) {
      this.newIRI.emit(this.newElementId);
    }
  }
}
