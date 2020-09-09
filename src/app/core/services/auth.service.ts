import {Injectable} from '@angular/core';
import {Observable, BehaviorSubject} from 'rxjs';
import {HttpClientService} from './http-client.service';
import {tap} from 'rxjs/operators';

@Injectable()
export class AuthService {
    isAuthenticated$: Observable<boolean>;
    user$: Observable<any>;
    private user: BehaviorSubject<any>;
    private isAuthenticated: BehaviorSubject<boolean>;

    constructor(public httpClient: HttpClientService) {
        this.user = new BehaviorSubject(false);
        this.isAuthenticated = new BehaviorSubject(null);

        this.user$ = this.user.asObservable();
        this.isAuthenticated$ = this.isAuthenticated.asObservable();
    }

    login(username: string, password: string) {
        const options = this.httpClient.appendHeader(
            { withCredentials: true },
            'Authorization',
            'Basic ' + btoa(`${username}:${password}`)
        );

        return this.httpClient.get('/core/user', options).pipe(tap(user => {
            this.user.next(user);
            this.isAuthenticated.next(true);
        }));
    }

    forgotPassword(username: string) {
        return this.httpClient.post('/core/user/forgotpassword', {
            username: username
        });
    }
}
