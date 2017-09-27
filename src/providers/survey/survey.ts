import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
 Generated class for the SurveyProvider provider.

 See https://angular.io/guide/dependency-injection for more info on providers
 and Angular DI.
 */
@Injectable()
export class SurveyProvider {

    data: any;
    accessKey: string = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";

    constructor(public http: Http) {
        //console.log('Hello SurveyProvider Provider');
    }

    getActiveSurveys() {
        // don't have the data yet
        return new Promise(resolve => {

            //let params: URLSearchParams = new URLSearchParams();
            //params.set('userId', userId);

            // We're using Angular HTTP provider to request the data,
            // then on the response, it'll map the JSON data to a parsed JS object.
            // Next, we process the data and resolve the promise with the new data.
            //this.http.get(this.environment.getURL() + 'shopping_list/getAll', { search: params })
            this.http.get('https://dxsurvey.com/api/MySurveys/getActive?accessKey=' + this.accessKey)
                .map(res => res.json())
                .subscribe(data => {
                    // we've got back the raw data, now generate the core schedule data
                    // and save the data for later reference
                    //console.log(data);
                    this.data = data;
                    resolve(this.data);
                },
                    err => {
                    console.log("ERROR -> " + JSON.stringify(err));
                });
        });
    }

}
