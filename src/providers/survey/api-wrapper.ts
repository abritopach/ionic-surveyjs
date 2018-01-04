import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// rxjs.
import { Observable } from "rxjs/Observable";
import { timeoutWith } from 'rxjs/operators';

@Injectable()
export class ApiWrapper {

    api: any;
    static baseURL = 'https://dxsurvey.com/api/MySurveys/';
    static ownerId = encodeURI("ownerId");
    static accessKey: string = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";

    // https://medium.com/@alonronin/magic-methods-in-javascript-meet-proxy-65e6305f4d3e
    constructor(public http: HttpClient) {
        const target = {};
        const handler = {
            get(target, name) {
                return {
                  get(endpoint, params) {
                    let arrayParams = [];
                    for (let param in params) {
                        if ((param == 'ownerId') && (params[param] == true)) params[param] = ApiWrapper.ownerId;
                        if ((param == 'accessKey') && (params[param] == true)) params[param] = ApiWrapper.accessKey;
                        arrayParams.push(param + '=' + encodeURI(params[param]));
                    }
                    let strParams = arrayParams.join('&');
                    return http.get(ApiWrapper.baseURL + endpoint + '?' + strParams).pipe(
                        timeoutWith(5000, Observable.throw(new Error('Failed to get data.')))
                    );
                  },
                  
                  post(body) {
                    return http.post(name, body)
                  }
                }
              }
        };
        

        this.api = new Proxy(target, handler);
    }
    
}
