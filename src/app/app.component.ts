import { QuestionContainer } from './questionContainer';
import { Question } from './question';
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

    private questionContainer: QuestionContainer[] = [];

    constructor(public uploaderService: Uploader,
                private http: Http) {}


    ngOnInit() {
    }

    onSubmit() {
    }

    print() {
        this.data = JSON.parse($('#text_helper').text());
        $('.step2').removeClass('hide');
        this.keys = this.getKeys(this.data);
    }

    generate() {
        $('.step2').find('*').prop('disabled', true);
        this.generateArray(this.data);
    }

    ngOnChanges(e) {
        const uploadFile = (<HTMLInputElement>window.document.getElementById('myFileInputField')).files[0];
        const fr = new FileReader();
        const text = [];

        $('.json-filename').val(uploadFile.name);

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
        this.questionContainer = [];
        for (const key in obj) {
            if (this.checkedKeys.indexOf(key) > -1) {
                if (obj.hasOwnProperty(key)) {
                    const temporalObject = obj[key];
                    for (const value in temporalObject) {
                        if (value) {
                            const container = new QuestionContainer();
                            container.key = key;
                            const question = new Question();
                            question.question = obj[key][value].question;
                            question.response = '';
                            question.answer = obj[key][value].answer;
                            question.hint = obj[key][value].hint;
                            question.nested = obj[key][value].nested;
                            container.question = question;
                            container.checked = false;
                            this.questionContainer.push(container);
                        }
                    }
                }
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
    }
}
