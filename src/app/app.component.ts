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

    private log: string ='';

    constructor(public uploaderService: Uploader, private http: Http) {}

    ngOnInit() {
    }

    onSubmit() { 
    }
    print(){
        this.data =JSON.parse($("#text_helper").text());
        this.keys = this.getKeys(this.data);
        console.log("this.keys ", this.keys);
    }

    ngOnChanges(e) {
        let uploadFile = (<HTMLInputElement>window.document.getElementById('myFileInputField')).files[0];
        let fr = new FileReader();
        let text = [];

        $(".json-filename").val(uploadFile.name);
        console.log(uploadFile);

        fr.onload = function(e) {
            text.push(fr.result);
            $("#text_helper").text(fr.result);
            // var result = JSON.parse(e.target.result);
            // var formatted = JSON.stringify(result, null, 2);
            // document.getElementById('result').value = formatted;
        }
        fr.readAsText(uploadFile);
        //this.data = text.toString();
        // fr.readAsDataURL(uploadFile)
        // let myUploadItem = new MyUploadItem(uploadFile);
        // myUploadItem.formData = { FormDataKey: 'Form Data Value' };  // (optional) form data can be sent with file
        // console.log(myUploadItem)
        // this.uploaderService.onSuccessUpload = (item, response, status, headers) => {
        //      // success callback
        // };
        // this.uploaderService.onCompleteUpload = (item, response, status, headers) => {
        //      console.log(uploadFile)
        // };
        // this.uploaderService.upload(myUploadItem);
    }
    public setData(value: string){
        this.data = value;
    }

    generateArray(obj){
        this.questions = [];
        for (let key in obj) {
            if(this.checkedKeys.indexOf(key) > -1){
                let question = new Topic();
                question.key = key;
                if (obj.hasOwnProperty(key)) {
                    question.questions = obj[key];
                    console.log(obj[key]);
                }
                console.log("question ", question);
                this.questions.push(question);
                console.log("this.questions", this.questions)
            }
        }
    }
    getKeys(obj){
        return Object.keys(obj);
    }

    checkbox(e){
        console.log(e)
    }

    private logCheckbox(element: HTMLInputElement): void {
        this.log += `Checkbox ${element.value} was ${element.checked ? '' : 'un'}checked\n`;
        if (element.checked) {
            this.checkedKeys.push(element.value)
        }else{
            this.checkedKeys = this.checkedKeys.filter(function(e) { return e !== element.value });
        }

        console.log("this.checkedKeys ", this.checkedKeys);
        this.generateArray(this.data);
    }
}
