import { Component, ViewChild, ElementRef, Input, SimpleChange } from '@angular/core';
import { OnInit, OnChanges, SimpleChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import { AppModel } from '../models';
import { createElement, ClassAttributes } from 'react';
import * as Ontodia from 'ontodia';
import * as ReactDOM from 'react-dom';

@Component({
  selector: 'app-ontodia-component',
  templateUrl: './app.ontodia.component.html',
  styleUrls: ['./app.ontodia.component.css']
})
export class AppOntodiaComponent implements OnInit, OnChanges {
  @ViewChild('ontodiaRoot', { read: ElementRef }) ontodiaRoot: ElementRef;
  @Input() model: AppModel;

  private workspace: Ontodia.Workspace;

  ngOnInit() {
    const onWorkspaceMounted = (workspace) => {
      if (!workspace) { return; }
      this.workspace = workspace;

      const model = workspace.getModel();
      model.graph.on('action:iriClick', (iri) => console.log(iri));
      const dataProvider = new Ontodia.DemoDataProvider();
      const graphBuilder = new Ontodia.GraphBuilder(dataProvider);
      const loadingGraph = graphBuilder.createGraph({
        elementIds: this.model.IRIs,
        links: []
      });
      workspace.showWaitIndicatorWhile(loadingGraph);

      loadingGraph.then(({ layoutData, preloadedElements }) => model.importLayout({
        layoutData,
        preloadedElements,
        dataProvider: dataProvider,
        validateLinks: true,
      })).then(() => {
        workspace.forceLayout();
        workspace.zoomToFit();
      });
    };

    const props = {
      ref: onWorkspaceMounted,
    };

    const ontodiaRoot = this.ontodiaRoot.nativeElement;
    ReactDOM.render(createElement(Ontodia.Workspace, props), ontodiaRoot);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!(
      changes.model &&
      changes.model.previousValue &&
      changes.model.currentValue
    )) { return; }
    const oldList: string[] = changes.model.previousValue.IRIs;
    const newList: string[] = changes.model.currentValue.IRIs;

    const newIRIs = newList.filter(iri => oldList.indexOf(iri) === -1);
    const removedIRIs = oldList.filter(iri => newList.indexOf(iri) === -1);

    this.addNewElements(newIRIs);
  }

  addNewElements (newIRIs: string[]) {
    const diagramModel = this.workspace.getModel();
    const elements: Ontodia.Element[] = [];

    for (const iri of newIRIs) {
      const el = diagramModel.createElement(iri);
      elements.push(el);
      el.set('position', {
        x: Math.random() * 1000,
        y: Math.random() * 1000,
      });
    }
    diagramModel.requestElementData(elements);
    diagramModel.requestLinksOfType();
    this.workspace.forceLayout();
    this.workspace.zoomToFit();
  }
}
