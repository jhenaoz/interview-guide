import { Question } from './question';
import { Component, OnInit, OnChanges, Pipe, PipeTransform } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
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
    private topics: Topic[] = [];

    // Form variables
    interviewForm: FormGroup;

    constructor(public uploaderService: Uploader,
                private http: Http,
                private fb: FormBuilder) {}


    ngOnInit() {
        // Form initialization
        this.interviewForm = this.fb.group({
            // Array of answered questions
            questionContainer: this.fb.array([])
        });
    }

    /*
    * Method to get questionContaner form array
    */
    get questionContainer(): FormArray {
        return <FormArray>this.interviewForm.get('questionContainer');
    }


    buildQuestionContainerFormControl(key: string, question: Question): FormGroup {
        return this.fb.group({
            key: key,
            checked: false,
            questions: question,
        });
    }

    onSubmit() {
    }

    test() {
        console.log($('#comment-block00').text());
        $('#badge00').addClass('hide');
        $('#comment-block00').hide();
    }
    print() {
        this.data = JSON.parse($('#text_helper').text());
        $('.step2').removeClass('hide');
        this.keys = this.getKeys(this.data);
    }
    generate() {
        $('.step2').find('*').prop('disabled', true);
        this.generateArray(this.data);
        console.log(this.questionContainer.value);
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
        this.topics = [];
        for (const key in obj) {
            if (this.checkedKeys.indexOf(key) > -1) {
                const topic = new Topic();
                topic.key = key;
                if (obj.hasOwnProperty(key)) {
                    topic.questions = obj[key];
                    const temporalObject = obj[key];
                    for (const value in temporalObject) {
                        if (value) {
                            const question = new Question();
                            question.question = obj[key][value].question;
                            question.response = '';
                            question.answer = obj[key][value].answer;
                            question.hint = obj[key][value].hint;
                            question.nested = obj[key][value].nested;
                            this.questionContainer.push(
                                this.buildQuestionContainerFormControl(key, question));
                            this.topics.push(topic);
                        }
                    }
                }
            }
        }

        console.log(this.topics)
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
