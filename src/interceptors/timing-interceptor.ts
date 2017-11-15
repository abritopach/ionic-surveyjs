import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse} from '@angular/common/http';

// rxjs.
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/do';

@Injectable()
export class TimingInterceptor implements HttpInterceptor {

    constructor() {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const started = Date.now();
        return next
            .handle(req)
            .do(event => {
                if (event instanceof HttpResponse) {
                    const elapsed = Date.now() - started;
                    console.log(`---> Request for ${req.urlWithParams} took ${elapsed} ms.`);
                    console.log('---> Status:', event.status);
                    console.log('---> Filter:', req.params.get('filter'));
                }
        });
     }
}