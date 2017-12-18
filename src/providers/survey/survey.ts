import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';

// rxjs.
import { Observable } from "rxjs/Observable";

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

    private readonly ownerId: string = encodeURI("adrbrpa1988@gmail.com");
    private readonly accessKey: string = "ed25dca0e09b41bca99da7d83d7333eb";

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

    // Returns the list of active surveys.
    getActiveSurveys(): Observable<any> {
        return this.http.get('https://dxsurvey.com/api/MySurveys/getActive?ownerId=' + this.ownerId + '&accessKey=' + this.accessKey);
    }

    // Returns the list of archive surveys.
    getArchiveSurveys(): Observable<any> {
        return this.http.get('https://dxsurvey.com/api/MySurveys/getArchive?ownerId=' + this.ownerId + '&accessKey=' + this.accessKey);
    }

    // Returns survey results.
    getSurveyResults(idSurvey: any): Observable<any> {
        return this.http.get<ItemsResponse>('https://dxsurvey.com/api/MySurveys/getSurveyResults/' + idSurvey + '?accessKey=' + this.accessKey);
    }

    // Delete a survey by it's id. You will not be able to restore this survey. The survey results become inaccessible.
    deleteSurvey(idSurvey: any): Observable<any> {
        return this.http.get('https://dxsurvey.com/api/MySurveys/delete/' + idSurvey + '?accessKey=' + this.accessKey);
    }

    // Change the survey name.
    changeSurveyName(idSurvey, newName): Observable<any> {
        console.log('https://dxsurvey.com/api/MySurveys/changeName/' + idSurvey + '?accessKey=' + this.accessKey + '&name=' + encodeURI(newName));
        return this.http.get('https://dxsurvey.com/api/MySurveys/changeName/' + idSurvey + '?accessKey=' + this.accessKey + '&name=' + encodeURI(newName));
    }
    
}
