import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse} from '@angular/common/http';
import { AlertController } from 'ionic-angular';

// rxjs.
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/do';

@Injectable()
export class TimingInterceptor implements HttpInterceptor {

    constructor(private alertCtrl: AlertController) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const started = Date.now();
        return next
            .handle(req)
            .do(event => {
                if (event instanceof HttpResponse) {
                    const elapsed = Date.now() - started;
                    console.log(`---> Request for ${req.urlWithParams} took ${elapsed} ms.`);
                    console.log('---> Status:', event.status);
                    //console.log('---> Filter:', req.params.get('filter'));
                }
            }, (err: HttpErrorResponse) => {
                this.handleError(err);
            }
        );
     }

    handleError (err: HttpErrorResponse) { 
        // Do messaging and error handling here.
        if (err.error instanceof Error) {
            // A client-side or network error occurred. Handle it accordingly.
            console.log('An error occurred:', err.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong.
            console.log(`Backend returned code ${err.status}, body was:`, err.error);
        }
        //this.presentAlert(err.message);
    }

    presentAlert(message: string) {
        let alert = this.alertCtrl.create({
          title: 'Error',
          subTitle: message,
          buttons: ['OK']
        });
        alert.present();
      }
}