import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../../core/services/auth.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {NavController, ToastController} from '@ionic/angular';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit, OnDestroy {
    private loginStateSubscription: Subscription;
    loginForm: FormGroup;
    isLoading = false;

    constructor(
        public authService: AuthService,
        public router: Router,
        public route: ActivatedRoute,
        public fb: FormBuilder,
        public navController: NavController,
        public toastController: ToastController) {

        this.loginForm = this.fb.group({
            username: [''],
            password: ['']
        });
    }

    ngOnInit() {
        const redirectAfterLogin = this.route.snapshot.queryParamMap.get('redirectUrl') || '/home';
        this.loginStateSubscription = this.authService.isAuthenticated$.subscribe(isLoggedIn => {
            if (isLoggedIn) {
                this.navController.navigateRoot(redirectAfterLogin, {});
                //this.router.navigate([redirectAfterLogin]);
            }
        });
    }

    ngOnDestroy() {
        this.loginStateSubscription.unsubscribe();
    }

    login() {
        this.isLoading = true;

        const credentials = this.loginForm.value;
        this.authService.login(credentials.username, credentials.password).subscribe(user => {
            this.isLoading = false;
        }, err => {
            this.isLoading = false;
            this.toastController.create({
                message: 'Wrong username / password combination',
                duration: 2000,
                color: 'danger'
            }).then(toastElement => toastElement.present());
        });
    }
}
