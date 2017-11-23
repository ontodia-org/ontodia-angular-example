import { Component, ViewChild, ElementRef, Input } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { createElement, ClassAttributes } from 'react';
import * as Ontodia from 'ontodia';
import * as ReactDOM from 'react-dom';

@Component({
  selector: 'app-ontodia-component',
  templateUrl: './app.ontodia.component.html',
  styleUrls: ['./app.ontodia.component.css']
})
export class AppOntodiaComponent implements OnInit {
  @ViewChild('ontodiaRoot', { read: ElementRef }) ontodiaRoot: ElementRef;
  @Input() irisToShow: string[];

  ngOnInit() {
    const onWorkspaceMounted = (workspace) => {
      if (!workspace) { return; }

      const model = workspace.getModel();
      model.graph.on('action:iriClick', (iri) => console.log(iri));
      const dataProvider = new Ontodia.DemoDataProvider();
      const graphBuilder = new Ontodia.GraphBuilder(dataProvider);
      const loadingGraph = graphBuilder.createGraph({
        elementIds: this.irisToShow,
        links: []
      });
      workspace.showWaitIndicatorWhile(loadingGraph);

      loadingGraph.then(({ layoutData, preloadedElements }) => model.importLayout({
        layoutData,
        preloadedElements,
        dataProvider: dataProvider,
        validateLinks: true,
      })).then(() => {
        // Example how you can add new element. This part will be improved.
        const diagramModel = workspace.getModel();
        const element = diagramModel.createElement(
          'http://ailab.ifmo.ru/dialog/tv/schema#hdPremiumChannelPack',
        );
        diagramModel.requestElementData([element]);
        element.set('position', {
          x: Math.random() * 1000,
          y: Math.random() * 1000,
        });

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
}
