import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";


@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // add authorization header with jwt token if available
        console.log(request.url);
        localStorage.setItem("test","testValue");
        console.log(localStorage.getItem("test"));

        console.log(localStorage.getItem('currentUser'));

        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        console.log(currentUser);

        if (currentUser && currentUser.token) {

            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUser.token}`
                }
            });
        }

        console.log(request);

        return next.handle(request);
    }
}
