import { Component, OnInit, OnChanges, Pipe, PipeTransform } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Uploader  } from 'angular2-http-file-upload';
import { MyUploadItem } from './upload-item.component';

import { Topic } from './topic';

import * as jQuery from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnChanges  {

    private data;
    private keys = [];
    private checkedKeys = [];
    private questions: Topic[] = [];
    constructor(public uploaderService: Uploader, private http: Http) {}

    ngOnInit() {
    }

    onSubmit() {
    }

    print() {
        this.data =JSON.parse($('#text_helper').text());
        this.keys = this.getKeys(this.data);
    }

    ngOnChanges(e) {
        const uploadFile = (<HTMLInputElement>window.document.getElementById('myFileInputField')).files[0];
        const fr = new FileReader();
        const text = [];

        $('.json-filename').val(uploadFile.name);
        console.log(uploadFile);

        fr.onload = function(e) {
            text.push(fr.result);
            $('#text_helper').text(fr.result);
        };
        fr.readAsText(uploadFile);
    }
    public setData(value: string) {
        this.data = value;
    }

    generateArray(obj) {
        this.questions = [];
        for (const key in obj) {
            if (this.checkedKeys.indexOf(key) > -1) {
                const question = new Topic();
                question.key = key;
                if (obj.hasOwnProperty(key)) {
                    question.questions = obj[key];
                    console.log(obj[key]);
                }
                this.questions.push(question);
            }
        }
    }

    getKeys(obj) {
        return Object.keys(obj);
    }

    checkbox(e) {
        console.log(e)
    }

    private logCheckbox(element: HTMLInputElement): void {
        if (element.checked) {
            this.checkedKeys.push(element.value);
        } else {
            this.checkedKeys = this.checkedKeys.filter(function(e) { return e !== element.value; });
        }
        this.generateArray(this.data);
    }
}
