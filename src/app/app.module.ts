import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { AppOntodiaComponent } from './ontodia/app.ontodia.component';

@NgModule({
  declarations: [
    AppComponent,
    AppOntodiaComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
