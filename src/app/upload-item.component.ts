import { UploadItem } from 'angular2-http-file-upload';
 
export class MyUploadItem extends UploadItem {
    constructor(file: any) {
        super();
        this.url = 'https://localhost:4200';
        this.headers = { HeaderName: 'Header Value', AnotherHeaderName: 'Another Header Value' };
        this.file = file;
    }
}