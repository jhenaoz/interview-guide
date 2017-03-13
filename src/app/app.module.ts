import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';

import { Uploader } from 'angular2-http-file-upload';

import { AppComponent } from './app.component';
// Pipes
import { ValuesPipe, ArrayifyPipe } from './app.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ValuesPipe,
    ArrayifyPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [Uploader],
  bootstrap: [AppComponent]
})
export class AppModule { }
