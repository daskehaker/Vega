import { Injectable } from '@angular/core';
import { Subject, Observable, throwError } from 'rxjs';
import { XhrFactory, HttpClient, HttpRequest } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {
  uploadProcess: Subject<any> = new Subject();
  downloadProcess: Subject<any> = new Subject();

}

@Injectable()
export class BrowserXhrWithProgress extends XhrFactory {
  constructor(private service: ProgressService) {super();}
      
  build(): XMLHttpRequest {
    var xhr: XMLHttpRequest;

    xhr.onprogress = (event) => {
      this.service.downloadProcess.next(this.createProgress(event));
    }

    xhr.upload.onprogress = (event) => {
      this.service.uploadProcess.next(this.createProgress(event));
    }
    return xhr;
  }

  private createProgress(event){
    return {
      total: event.total,
      percentage: Math.round(event.loaded / event.total * 100)
    }
  }
}