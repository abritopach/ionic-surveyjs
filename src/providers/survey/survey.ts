import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';

// rxjs.
import { Observable } from "rxjs/Observable";

import { SurveyModel } from "../../models/survet.model";
import { Survey } from 'survey-angular';

interface ItemsResponse {
    Data: string[];
}

/*
 Generated class for the SurveyProvider provider.

 See https://angular.io/guide/dependency-injection for more info on providers
 and Angular DI.
 */
@Injectable()
export class SurveyProvider {

    private readonly ownerId: string = encodeURI("ownerId");
    private readonly accessKey: string = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";

    constructor(protected http: HttpClient) {
        //console.log('Hello SurveyProvider Provider');
    }

    testProgressRequest() {
        const req = new HttpRequest('GET', 'https://jsonplaceholder.typicode.com/photos', {
            reportProgress: true,
          });
        this.http.request(req).subscribe(event => {
            // Via this API, you get access to the raw event stream.
            // Look for upload progress events.
            if (event.type === HttpEventType.UploadProgress) {
                // This is an upload progress event. Compute and show the % done:
                const percentDone = Math.round(100 * event.loaded / event.total);
                console.log(`File is ${percentDone}% uploaded.`);
              } else if (event instanceof HttpResponse) {
                console.log('File is completely uploaded!');
              }
            if (event.type === HttpEventType.DownloadProgress) {
                const kbLoaded = Math.round(event.loaded / 1024);
                console.log(`Download in progress! ${ kbLoaded }Kb loaded`);
            }
            if (event.type === HttpEventType.Response) {
                console.log('Data received', event.body);
            }
          });
    }

    getActiveSurveys(): Observable<any>{
        return this.http.get('https://dxsurvey.com/api/MySurveys/getActive?ownerId=' + this.ownerId + '&accessKey=' + this.accessKey);
    }

    /*
    getActiveSurveys() {
        return new Promise(resolve => {
            this.http.get('https://dxsurvey.com/api/MySurveys/getActive?accessKey=' + this.accessKey)
            .subscribe(
                data => {
					console.log(data);
                    resolve(data);
                },
                (err: HttpErrorResponse) => {
                    if (err.error instanceof Error) {
                      // A client-side or network error occurred. Handle it accordingly.
                      console.log('An error occurred:', err.error.message);
                    } else {
                      // The backend returned an unsuccessful response code.
                      // The response body may contain clues as to what went wrong,
                      console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
                    }
                }
            );
          });
    }
    */

    getSurveyResults(idSurvey: any): Observable<any>{
        return this.http.get<ItemsResponse>('https://dxsurvey.com/api/MySurveys/getSurveyResults/' + idSurvey + '?accessKey=' + this.accessKey);
    }
    
    /*
	getSurveyResults(idSurvey: any) {
        return new Promise(resolve => {
            this.http.get<ItemsResponse>('https://dxsurvey.com/api/MySurveys/getSurveyResults/' + idSurvey + '?accessKey=' + this.accessKey)
            .subscribe(
                data => {
                    resolve(data.Data);
                },
                (err: HttpErrorResponse) => {
                    if (err.error instanceof Error) {
                      // A client-side or network error occurred. Handle it accordingly.
                      console.log('An error occurred:', err.error.message);
                    } else {
                      // The backend returned an unsuccessful response code.
                      // The response body may contain clues as to what went wrong,
                      console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
                    }
                }
            );
          });
    }
    */

}
