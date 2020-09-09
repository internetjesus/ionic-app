import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {switchMap} from 'rxjs/operators';

import {AuthService} from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(public authService: AuthService, public router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.authService.isAuthenticated$.pipe(
            switchMap(isAuthenticated => {
                if (isAuthenticated) {
                    return of(true);
                }

                this.router.navigate(['/user/login'], {
                    queryParams: {
                        redirectUrl: state.url
                    }
                });

                return of(false);
            })
        );
    }
}
