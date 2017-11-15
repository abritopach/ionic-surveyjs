import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

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

    accessKey: string = "e74dc097c56f4ecfae84fa3cda12d9d2";

    constructor(public http: HttpClient) {
        //console.log('Hello SurveyProvider Provider');
    }

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

}
