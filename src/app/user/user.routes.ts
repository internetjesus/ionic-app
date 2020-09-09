import {Routes} from '@angular/router';
import {LoginPageComponent} from './containers/login/login-page.component';
import {ForgotPasswordPageComponent} from './containers/forgot-password/forgot-password-page.component';
import {ProfilePageComponent} from './containers/profile/profile-page.component';

export const userRoutes: Routes = [
    {
        path: 'login',
        component: LoginPageComponent,
    },
    {
        path: 'forgot-password',
        component: ForgotPasswordPageComponent,
    },
    {
        path: 'profile',
        component: ProfilePageComponent,
    }
];
